"use client";

import { useParams }  from 'next/navigation'
import { useQuery } from "@tanstack/react-query";
import axios from '@/lib/utils/axios';
import Snackbar from '@/components/common/snackbar';
import TableSection from './TableSection';

const sportPage = ({ }) => {
  const { id } = useParams();
  
  const fetchSport = async () => {
    const { data } = await axios.get(`/category/${id}`);
    return data?.payload.data
  }

  const fetchEvents = async () => {
    const { data } = await axios.get(`/event`);
    return data?.payload.data;
  };

  const {data: sportData, isLoading: isSportLoading, isError: isSportError, error: sportError} = useQuery({
    queryKey: ["fetch-sport"],
    queryFn: fetchSport
  })

  const {
    data: events,
    isLoading,
    isError,
    error: eventsError,
  } = useQuery({
    queryKey: [`fetch-events`],
    queryFn: fetchEvents,
  });
  
  if (isSportError) {
    Snackbar.error(sportError.response?.data.message || sportError.message);
  }

  if (eventsError) {
      Snackbar.error(eventsError.response?.data.message || eventsError.message);
  }

  
  return (
      <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{sportData?.sport}</h1>
              <p class="mt-4 text-xl text-gray-500">{sportData?.description}</p>
          </div>
        <div>
        <div class="mt-10">
          <div aria-hidden="true" class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
            <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
              <div class="flex items-center space-x-6 lg:space-x-8">
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                    <img src="https://www.hindustantimes.com/ht-img/img/2023/10/17/1600x900/LA-Games_1697511384133_1697511393925.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://cdn.vox-cdn.com/thumbor/cKsuPDxElRZJUtKOm1v-dS0O3Mc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22732955/1330045904.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                </div>
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://www.recordonline.com/gcdn/authoring/2012/08/14/NTHR/ghows-TH-6a78c51d-d15b-4066-a7e5-874a5a2b9d3d-dbf17030.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://www.hindustantimes.com/ht-img/img/2023/10/18/1600x900/ARCHERY-ASIAD-2022-2023-HANGZHOU-4_1697595700238_1697595745470.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQstDAz-hK0Zjiu2y4x_fO5mvdQjcokioJWvSzKaAtZ0VFkhFpKkAl7XnVpACijg_r4jXM&usqp=CAU" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                </div>
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://w0.peakpx.com/wallpaper/990/661/HD-wallpaper-boxing-match-boxing-ropes-ring-boxer.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://www.usatoday.com/gcdn/presto/2021/08/07/USAT/15ce8a09-0715-4376-9bee-83ebf4083d8e-USP_Olympics__Basketball-Men_Finals_-_Gold_Medal_M_28.jpg?crop=3615,4820,x1299,y0" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" class="inline-block rounded-md border border-transparent bg-c-orange-600 px-8 py-3 text-center font-medium text-white hover:bg-c-orange-700">See All Events </a>
        </div>
      </div>
    </div>
    <TableSection eventData={events} />
    </div>
  )
}

export default sportPage;