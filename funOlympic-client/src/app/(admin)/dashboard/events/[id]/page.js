"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const event = {
  id: 1,
  category: "Football",
  eventTitle: "Watch the Football match live",
  description: "This is a description",
  time: "2024-12-25",
  thumbnail:
    "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
  published: true,
  liveChatEnabled: true,
  streamLink: "https://www.youtube.com/watch?v=6JYIGclVQdw",
};
function EventDetails() {
  const { id } = useParams();
  const [data, setData] = useState({
    category: event.category,
    title: event.eventTitle,
    description: event.description,
    thumbnail: event.thumbnail,
    "stream link": event.streamLink,
    time: event.time,
  });

  const [boolDetails, setBoolDetails] = useState({
    published: event.published,
    "live chat": event.liveChatEnabled,
  });

  const EventHeading = () => {
    return (
      <>
        <h2 className="text-base font-bold leading-6 text-gray-900">
          Event Details
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </>
    );
  };

  const ButtonGroup = () => {
    return (
      <div className="flex items-center justify-between">
        <button className="btn-danger">Cancel</button>
        <button className="btn-primary">Save changes</button>
      </div>
    );
  };

  return (
    <>
      <main className=" lg:flex-auto">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <EventHeading />

            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              {Object.keys(data).map((key) => {
                if (key === "thumbnail") {
                  return (
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 capitalize">
                        {key}
                      </dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        {/* <div className="text-gray-900">Watch live match now</div> */}
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            src={`${data[key]}`}
                            alt={"Event thumbnail"}
                          />
                        </div>
                        <button
                          type="button"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Update
                        </button>
                      </dd>
                    </div>
                  );
                }
                return (
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 capitalize">
                      {key}
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto ">
                      <div className="text-gray-900 ">{data[key]}</div>
                      <button
                        type="button"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Update
                      </button>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              {Object.keys(boolDetails).map((key) => {
                return (
                  <Switch.Group as="div" className="flex pt-6">
                    <Switch.Label
                      as="dt"
                      className="w-64 flex-none pr-6 font-medium text-gray-900 capitalize"
                      passive
                    >
                      {key}
                    </Switch.Label>
                    <dd className="flex flex-auto items-center justify-end">
                      <Switch
                        checked={boolDetails[key]}
                        onChange={() => console.log("clicked")}
                        className={classNames(
                          boolDetails[key] ? "bg-indigo-600" : "bg-gray-200",
                          "flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            boolDetails[key]
                              ? "translate-x-3.5"
                              : "translate-x-0",
                            "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                          )}
                        />
                      </Switch>
                    </dd>
                  </Switch.Group>
                );
              })}
            </dl>
          </div>
          <ButtonGroup />
        </div>
      </main>
    </>
  );
}

export default EventDetails;
