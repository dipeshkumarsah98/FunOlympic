"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logoLink, navigation } from "@/constants/data";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { data: session, status } = useSession();
  const path = usePathname();

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  const isLoggedIn = status === "authenticated";
  let isAdmin = false;
  if (isLoggedIn) {
    isAdmin = session.user.role.toLocaleLowerCase() === "admin";
  }

  return (
    <header
      className={clsx(
        `inset-x-0 font-intel top-0 z-50 fixed transition-all duration-100 ease-in-out pb-5 main-bg `,
        {
          "bg-white": isScrolling,
        }
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={clsx(`px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0`, {
            "p-4": isScrolling,
          })}
        >
          <nav
            className="flex items-center justify-between lg:justify-start"
            aria-label="Global"
          >
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">FunOlymic</span>
              <img alt="FunOlympic" className="h-10 w-auto" src={logoLink} />
              {/* <Image
                alt="fun-olympic"
                src={"/logo.png"}
                width={500}
                height={500}
              /> */}
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="hidden lg:ml-12 lg:flex lg:gap-x-14">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx("text-sm font-semibold leading-6 text-gray-900", {
                    "text-c-orange-600": path === item.href,
                  })}
                >
                  {item.name}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  href="/dashboard/users"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Admin
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  href="/register"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Register
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in
                </Link>
              )}
              {isLoggedIn && (
                <span
                  className="text-sm cursor-pointer font-semibold leading-6 text-gray-900"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </span>
              )}
            </div>
          </nav>
        </div>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">FunOlympic</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=c-orange&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {isAdmin && (
                <Link
                  href="/dashboard/users"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Admin
                </Link>
              )}
              <div className="py-6">
                {isLoggedIn === false && (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
                {isLoggedIn && (
                  <span
                    onClick={() => {
                      signOut();
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </span>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
