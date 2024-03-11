"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import Snackbar from "@/components/common/snackbar";
import Input from "@/components/common/input";
import useAuthFetch from "@/lib/hooks/useAuth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginSection() {
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting, isValid } = formState;
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit = handleSubmit(async (credential) => {
    try {
      const res = await signIn("credentials", {
        email: credential.email,
        password: credential.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.error) {
        setError("Invalid Email or Password");
        Snackbar.error("Invalid Email or Password");
        return;
      }
      if (res?.ok) {
        Snackbar.success("Login Successful");
        router.push("/");
        router.refresh();
        return;
      }
    } catch (error) {
      Snackbar.error(
        "Something went wrong, Please check your internet connection"
      );
    }
  });

  return (
    <>
      <div className="flex min-h-full flex-1 relative flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {error && (
            <p className="text-red-500 absolute w-full m-auto left-0 right-0 text-sm text-center mt-4">
              {error}
            </p>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit} method="POST">
            <Input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              errors={errors}
              {...register("email", { required: "Email is required" })}
            />

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                // required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                errors={errors}
                {...register(
                  "password",
                  {
                    required: "Password is required",
                  },
                  { minLength: 6 }
                )}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={!isValid}
                className="flex disabled:bg-indigo-500 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "Loading.." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
