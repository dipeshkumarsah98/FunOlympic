// HeroSection


export default function HeroSection() {

  return (
    <div className="bg-white">

      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-0">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Is Prabess a super hero?
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                {/* <a
                  href="live-events"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View Live Events
                </a> */}
                <a href="live-events" className="text-sm font-semibold leading-6 text-gray-900">
                  Live Events <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              // className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              className="mt-10 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  )
}


// Second Theme:

// import { ChevronRightIcon } from '@heroicons/react/20/solid'

// export default function HeroSection() {
//   return (
//     <div className="bg-white">
//       <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
//         <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
//           <div className="px-6 lg:px-0 lg:pt-4">
//             <div className="mx-auto max-w-2xl">
//               <div className="max-w-lg">
//                 <img
//                   className="h-11"
//                   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                   alt="Your Company"
//                 />
//                 <div className="mt-24 sm:mt-32 lg:mt-16">
//                   <a href="#" className="inline-flex space-x-6">
//                     <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
//                       What's new
//                     </span>
//                     <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
//                       <span>Just shipped v0.1.0</span>
//                       <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                     </span>
//                   </a>
//                 </div>
//                 <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//                   Prabess don is doing Sport
//                 </h1>
//                 <p className="mt-6 text-lg leading-8 text-gray-600">
//                   Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
//                   amet fugiat veniam occaecat fugiat aliqua.
//                 </p>
//                 <div className="mt-10 flex items-center gap-x-6">
//                   <a
//                     href="#"
//                     className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   >
//                     Documentation
//                   </a>
//                   <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
//                     View on GitHub <span aria-hidden="true">→</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
//             <div
//               className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
//               aria-hidden="true"
//             />
//             <div className="shadow-lg md:rounded-3xl">
//               <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
//                 <div
//                   className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
//                   aria-hidden="true"
//                 />
//                 <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
//                   <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
//                     <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
//                       <div className="flex bg-gray-800/40 ring-1 ring-white/5">
//                         <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
//                           <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
//                             OlympicNotification.jsx
//                           </div>
//                           <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
//                         </div>
//                       </div>
//                       <div className="px-6 pb-14 pt-6 text-white text-wrap">
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         Prabess is always hero
//                         </div>
//                     </div>
//                   </div>
//                   <div
//                     className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
//                     aria-hidden="true"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
//       </div>
//     </div>
//   )




// Fist Theme


  // return (
  //   <div className="bg-white">
  //     <div className="relative">
  //       <div className="mx-auto max-w-7xl">
  //         <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
  //           <svg
  //             className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
  //             viewBox="0 0 100 100"
  //             preserveAspectRatio="none"
  //             aria-hidden="true"
  //           >
  //             <polygon points="0,0 90,0 50,100 0,100" />
  //           </svg>

  //           <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
  //             <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
  //               <div className="hidden sm:mb-10 sm:flex">
  //                 <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
  //                   Global Celebration of Sports, Unity, and Excellence in 2024.
  //                   <Link
  //                     href="#"
  //                     className="whitespace-nowrap font-semibold text-indigo-600"
  //                   >
  //                     <span className="absolute inset-0" aria-hidden="true" />
  //                     See All Sports <span aria-hidden="true">&rarr;</span>
  //                   </Link>
  //                 </div>
  //               </div>
  //               <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
  //                 Welcome to FunOlympic 2024
  //               </h1>
  //               <p className="mt-6 text-lg leading-8 text-gray-600">
  //                 Get ready to witness the greatest athletes from around the
  //                 globe compete in the ultimate celebration of sportsmanship and
  //                 skill. Whether you're a die-hard fan or just looking for some
  //                 excitement, FunOlympic 2024 has something for everyone.
  //               </p>

  //               <div className="mt-10 flex items-center gap-x-6">
  //                 <Link
  //                   href="#"
  //                   className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  //                 >
  //                   Watch Livestream
  //                 </Link>
  //                 <Link
  //                   href="#"
  //                   className="text-sm font-semibold leading-6 text-gray-900"
  //                 >
  //                   See All Events <span aria-hidden="true">→</span>
  //                 </Link>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
  //         <img
  //           className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
  //           // src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
  //           src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //           alt="FunOlympic 2024 athletes"
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
// }
