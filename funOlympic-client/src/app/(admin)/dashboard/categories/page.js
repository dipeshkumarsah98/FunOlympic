"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import Snackbar from "@/components/common/snackbar";
import { Dialog, Transition } from "@headlessui/react";
import Input from "@/components/common/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useRef, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useForm } from "react-hook-form";

const projects = [
  {
    name: "Graph API",
    initials: "GA",
    href: "#",
    members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "Component Design",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Templates",
    initials: "T",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "React Components",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

export default function Categories() {
  const axios = useAxiosAuth();
  const [open, setOpen] = useState(false);

  const fetchCategories = async () => {
    const { data } = await axios.get("/category");
    return data?.payload?.data;
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetch-categories"],
    queryFn: fetchCategories,
  });

  if (isError) {
    Snackbar.error("Something went wrong!");
  }

  if (isLoading) return <div className="text-2xl font-sans">Loading...</div>;

  return (
    <div className="relative">
      <AddNewCategory open={open} setOpen={setOpen} />
      <h2 className="text-sm font-medium text-gray-500">
        Available Categories
      </h2>

      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {categories.map((category) => (
          <li
            key={category.id}
            className="col-span-1 overflow-hidden flex rounded-md shadow-sm"
          >
            <Avatar
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "blue",
                "green",
              ])}
              name={category.sport}
            />

            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="font-medium text-gray-900 hover:text-gray-600">
                  {category.sport}
                </p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-c-orange-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between">
        <span></span>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          Add Category
        </button>
      </div>
    </div>
  );
}

const AddNewCategory = ({ open, setOpen }) => {
  const createCategory = async (details) => {
    const { data } = await axios.post("/category", details);
    return data?.payload?.data;
  };
  const axios = useAxiosAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    mutationKey: ["update-category"],
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-categories");
      setOpen(false);
      Snackbar.success("Category created successfully");
    },
    onError: () => {
      Snackbar.error("Something went wrong!");
    },
  });

  const queryClient = useQueryClient();
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting, isValid } = formState;
  const cancelButtonRef = useRef(null);
  const onSubmit = handleSubmit(async (data) => {
    mutate({
      sport: data.title,
      description: data.description,
    });
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => {
          Snackbar.info("Please click on cancel button to close the dialog");
        }}
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
              <Dialog.Panel
                onSubmit={onSubmit}
                as="form"
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-bold leading-6 text-gray-900"
                      >
                        Create New Category
                      </Dialog.Title>
                      <hr className="mt-2" />
                      <div className="mt-2 space-y-7 w-full">
                        <Input
                          className="input"
                          label="Title"
                          id="title"
                          name="title"
                          type="text"
                          autoComplete="title"
                          errors={errors}
                          {...register("title", {
                            required: "Event title is required",
                          })}
                        />
                        <Input
                          className="input"
                          label="Description"
                          id="description"
                          name="description"
                          type="text"
                          autoComplete="description"
                          errors={errors}
                          {...register("description", {
                            required: "Description is required",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:gap-3 sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-fit"
                    onClick={handleSubmit}
                  >
                    {isPending ? "Creating..." : "Create Category"}
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
