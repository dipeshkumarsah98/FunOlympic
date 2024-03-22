"use client";

import { useParams } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import Snackbar from "@/components/common/snackbar";
import Link from "next/link";
import { Fragment, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";

function EventDetails() {
  const { id } = useParams();
  const axios = useAxiosAuth();

  const fetchData = async () => {
    const { data } = await axios.get(`/event/${id}`);
    return data?.payload.data;
  };
  const {
    data: eventDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`event-${id}`],
    queryFn: fetchData,
  });

  if (isError) {
    Snackbar.error(
      "Something went wrong, Please check your internet connection"
    );
    return;
  }
  const fetchEventData = async () => {
    const { data } = await axios("/event");
    return data?.payload?.data;
  };

  const { data } = useQuery({
    queryFn: fetchEventData,
    queryKey: ["fetch-events"],
  });

  //   const filteredData = data?.filter((event) => event.published);
  const filteredData = data;
  const commentMessages = eventDetail?.comments[0]?.message || null;
  console.log("🚀 ~ EventDetails ~ commentMessages:", commentMessages);

  if (isLoading) return <div className="font-sans text-2xl">Loading...</div>;
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* left side view */}
            <div className="w-fit">
              <ReactPlayer
                playing={true}
                controls={true}
                url={eventDetail?.streamLink}
                style={{ width: "100%", height: "100%" }}
              />
              <div className="flex items-center justify-between">
                <h1 className="text-4xl my-5  font-intel font-bold leading-10 text-gray-900">
                  {eventDetail?.eventTitle}
                </h1>
                <div className="px-3 py-2 w-fit text-sm text-white bg-blue-500 rounded-full">
                  {eventDetail?.category?.sport}
                </div>
              </div>
              <hr />
              {/* description */}
              <div className="my-2 font-inter">
                <p className="my-2">
                  <strong>Published At: </strong>
                  {new Date(eventDetail?.updatedAt).toDateString()}
                </p>
                <p className="font-bold mb-1">Description: </p>
                {eventDetail?.description}
              </div>

              {/* Comments sections */}
              <h3 className="mt-5 mb-2 font-bold  font-intel text-lg">
                {eventDetail.comments[0]?.message?.length || 0} Comments
              </h3>

              <hr />
              <div>
                {/* Event comments */}
                <CommentBox
                  commentId={
                    eventDetail?.comments?.length > 0
                      ? eventDetail.comments[0].id
                      : null
                  }
                  eventId={id}
                />
                <br />
                {commentMessages &&
                  commentMessages.map((message) => (
                    <div key={message.id} className="my-2">
                      <p className="font-bold">{message.user.name}</p>
                      <p>{message.body}</p>
                    </div>
                  ))}
              </div>
            </div>
            {/* right side view */}
            <div>
              <h2 className=" text-xl mb-3 font-intel font-bold leading-6 text-gray-900">
                Similar events
              </h2>
              <hr />
              {filteredData && <EventCard events={filteredData} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const EventCard = ({ events }) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
      {events.map((event) => (
        <div key={event.id} className="group relative">
          <Link href={`live-events/${event.id}`}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={event.thumbnail}
                alt={event.eventTitle}
                className="h-full w-full object-fill lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex gap-2 justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-700">
                  <p>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {event.eventTitle}
                  </p>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {event.description.slice(0, 100)}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

function CommentBox({ eventId, commentId }) {
  const [comment, setComment] = useState("");
  const { data, status } = useSession();
  const queryClient = useQueryClient();

  const axios = useAxiosAuth();

  const postComment = async (comment) => {
    const { data } = axios.post("/message", comment);
    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postComment,
    mutationKey: ["post-comment"],
    onSuccess: () => {
      Snackbar.success("Comment posted successfully");
      queryClient.invalidateQueries([`event-${eventId}`]);
    },
    onError: (error) => {
      Snackbar.error("Failed to post comment");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment === "") {
      Snackbar.info("Cannot post an empty comment");
      return;
    }
    if (status !== "authenticated") {
      Snackbar.error("You need to be logged in to post a comment");
      return;
    }
    const body = {
      body: comment,
      eventId,
      type: "COMMENT",
      userId: data.user.id,
      commentId: commentId || "",
    };
    mutate(body);
  };
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" onSubmit={handleSubmit} className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              onChange={(e) => setComment(e.target.value)}
              defaultValue={""}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5"></div>
            <div
              className="flex
             
            -shrink-0"
            >
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isPending ? "Posting.." : "Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventDetails;
