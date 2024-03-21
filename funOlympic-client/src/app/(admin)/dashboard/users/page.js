"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Snackbar from "@/components/common/snackbar";

export default function UserPage() {
  const axios = useAxiosAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userId, setUserId] = useState(null);

  const fetchUsers = async () => {
    const { data } = await axios.get("/user");
    return data?.payload.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetch-users"],
    queryFn: fetchUsers,
  });

  if (isError) {
    Snackbar.error(error.response?.data?.message || error.message);
  }

  const handleDeleteProcess = (id) => {
    setUserId(id);
    setConfirmDelete(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <DeleteDialog
        open={confirmDelete}
        setOpen={setConfirmDelete}
        userId={userId}
      />

      <UserHeading />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {(isLoading || isError) && <LoadingTable />}
            {data && (
              <UserTable data={data} handleDelete={handleDeleteProcess} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const UserHeading = () => {
  return (
    <div className="flex items-center justify-between ">
      <div className="sm:flex-auto">
        <h1 className="text-base font-bold leading-6 text-gray-900">
          List of Users
        </h1>
      </div>
    </div>
  );
};

const UserTable = ({ data, handleDelete }) => {
  const cols = ["Contact", "Country", "Role"];
  return (
    <table className="min-w-full divide-y divide-gray-300 w-full">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            Full Name
          </th>
          {cols.map((col) => (
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              key={col}
            >
              {col}
            </th>
          ))}

          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <button className="sr-only">Delete</button>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((person) => (
          <UserTableItem
            key={person.id}
            handleDelete={handleDelete}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};

const UserTableItem = ({ person, handleDelete }) => {
  const { id, name, email, phone, country, roles } = person;
  return (
    <tr>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="h-11 w-11 flex-shrink-0">
            <img
              className="h-11 w-11 rounded-full"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt={name}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{name}</div>
            <div className="mt-1 text-gray-500">{email}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <div className="text-gray-900">{phone}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {country}
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {roles}
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <button
          href="#"
          onClick={() => handleDelete(id)}
          className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Remove<span className="sr-only">, {name}</span>
        </button>
      </td>
    </tr>
  );
};

const LoadingTable = () => {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex items-center gap-4">
        {Array.from({ length: 4 }).map((_, i) => {
          return <div key={i} className="bg-gray-500 h-5 w-full rounded"></div>;
        })}
      </div>

      {Array.from({ length: 4 }).map((_, i) => {
        return (
          <div key={i} className="flex items-center gap-4">
            {Array.from({ length: 4 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="bg-gray-400 h-3 w-full rounded-md"
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const DeleteDialog = ({ open, setOpen, userId }) => {
  const axios = useAxiosAuth();
  const queryClient = useQueryClient();
  const cancelButtonRef = useRef(null);

  const deleteUser = async (id) => {
    const { data } = await axios.delete(`/user/${id}`);
    return data?.payload?.data;
  };

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (id) => deleteUser(id),
    mutationKey: ["delete-user"],
    onSuccess: () => {
      Snackbar.success(`User deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["fetch-users"] });
    },
  });

  const handleDelete = (id) => {
    mutate(id);
    setOpen(false);
  };

  if (isError) {
    Snackbar.error(error.response?.data?.message || error.message);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Delete account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete account? All of your
                          data will be permanently removed. This action cannot
                          be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleDelete(userId)}
                    disabled={isPending}
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
