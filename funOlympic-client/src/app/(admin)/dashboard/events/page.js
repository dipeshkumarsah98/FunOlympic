import clsx from "clsx";
import Link from "next/link";

const events = [
  {
    id: 1,
    category: "Football",
    eventTitle: "This is a title",
    description: "This is a description",
    time: "2024-12-25",
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    published: true,
    href: "#",
    liveChatEnabled: true,
    streamLink: "https://www.youtube.com/watch?v=6JYIGclVQdw",
  },
  {
    id: 2,
    category: "volleyball",
    eventTitle: "This is a title",
    description: "This is a description",
    time: "2024-12-25",
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    published: true,
    href: "#",
    liveChatEnabled: true,
    streamLink: "https://www.youtube.com/watch?v=6JYIGclVQdw",
  },
];

export default function EventPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="flex items-center justify-between ">
        <div className="sm:flex-auto">
          <h1 className="text-base font-bold leading-6 text-gray-900">
            Event List
          </h1>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {events.map((event) => (
          <div key={event.id} className="group relative">
            <Link href={`events/${event.id}`}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={event.thumbnail}
                  alt={event.eventTitle}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex gap-2 justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <p>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {event.eventTitle}
                    </p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{event.category}</p>
                </div>
                {/* <p
                className={clsx(
                  "text-xs font-medium text-white bg-green-50 px-2 py-1 rounded h-fit ",
                  {
                    "bg-red-400": !event.published,
                  },
                  {
                    "bg-green-400": event.published,
                  }
                )}
              >
                {event.published ? "Published" : "Not Published"}
              </p> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
