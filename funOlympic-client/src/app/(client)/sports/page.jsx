"use client";

import Snackbar from '@/components/common/snackbar';
import axios from '@/lib/utils/axios';
import Link from "next/link"
import { useQuery } from "@tanstack/react-query";
import { TrophyIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react'
import { ArrowDownCircleIcon, ArrowPathIcon, ArrowUpCircleIcon } from '@heroicons/react/20/solid'
import { logoLink } from '@/constants/data';


const Sports = () => {

  const fetchSports = async () => {
    const { data } = await axios.get("/category");
    return data?.payload.data
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetch-sports"],
    queryFn: fetchSports
  })

  if (isError) {
    Snackbar.error(error.response?.data?.message || error.message);
  }

  // return (
  //   <div>
  //     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  //       <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
  //         Recent activity
  //       </h2>
  //     </div>
  //     <div className="mt-6 overflow-hidden border-t border-gray-100">
  //       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  //         <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
  //           <table className="w-full text-left">
  //             <thead className="sr-only">
  //               <tr>
  //                 <th>Title</th>
  //                 <th className="hidden sm:table-cell">Description</th>
  //                 <th>More details</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {data && data.map((event) => (
  //                 <Fragment key={event.id}>
  //                   <tr className="text-sm leading-6 text-gray-900">
  //                     <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
  //                       <time dateTime={event.id}>{event.sport}</time>
  //                       <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
  //                       <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
  //                     </th>
  //                   </tr>
  //                   <tr>

  //                     <td className="relative py-5 pr-6">
  //                       <div className="flex gap-x-6">
  //                         <img
  //                           className="mx-auto h-10 w-auto"
  //                           src={logoLink}
  //                           alt="Fun-Olympic Logo"
  //                         />
  //                         <div className="flex-auto">
  //                           <div className="flex items-start gap-x-3">
  //                             <div className="text-sm font-medium leading-6 text-gray-900">{event.sport}</div>
  //                           </div>
  //                         </div>
  //                       </div>
  //                       <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
  //                       <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
  //                     </td>
  //                     <td className="hidden py-5 pr-6 sm:table-cell">
  //                       <div className="mt-1 text-xs leading-5 text-gray-500">{event.description}</div>
  //                     </td>
  //                     <td className="py-5 text-right">
  //                       <div className="flex justify-end">
  //                         <a
  //                           href={`live-events/${event.id}`}
  //                           className="text-sm font-medium leading-6 text-c-orange-600 hover:text-c-orange-500"
  //                         >
  //                           Live<span className="hidden sm:inline"> View</span>
  //                         </a>
  //                       </div>
  //                     </td>
  //                   </tr>

  //                 </Fragment>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="container m-10 p-4 sm:px-6 lg:px-8">
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data && data.map((sport) => (
          <li key={sport.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <Link href={`/sports/${sport.id}`}>
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">{sport.sport}</h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      Watch Live
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">{sport.description}</p>
                </div>

                <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={sport.imageUrl} alt="" />
              </div>
            </Link>

            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a href={`/sports/${sport.id}`} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <div className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <CalendarDaysIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      See Event Schedule
                  </a>
                </div>
                {/* <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`/sports/${sport.id}`}
                  className=" relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <TrophyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  See results
                </a>
              </div> */}
              </div>
            </div>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default Sports;