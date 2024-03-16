"use client";

import axios from "@/lib/utils/axios";
import Input from "@/components/common/input";
import Link from "next/link";
import Snackbar from "@/components/common/snackbar";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const RegisterSection = () => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors, isSubmitting } = formState;
  const password = watch("password");
  const router = useRouter();

  const onSubmit = handleSubmit(async (credentials) => {
    try {
      console.log(credentials);
      const res = await axios.post("/auth/signup", {
        name: credentials["full-name"],
        email: credentials.email,
        country: credentials.country,
        password: credentials.password,
        phone: credentials.contact,
        sport: credentials.sport,
      });
      if (res?.data?.payload) {
        console.log(res.data.payload);
        Snackbar.success(
          "Account Created successfully, please check your email to verify your account"
        );
        router.push("/login");
        return;
      }
    } catch (err) {
      console.log("🚀 ~ onSubmit ~ err:", err);
      if (err?.response?.data?.status === 400) {
        Snackbar.error("User already exists");
        return;
      }
      Snackbar.error("Something went wrong, please try again later");
    }
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form
            className="space-y-6"
            onSubmit={onSubmit}
            action="#"
            method="POST"
          >
            <Input
              id="full-name"
              name="full-name"
              label="Full name"
              type="text"
              autoComplete="name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              errors={errors}
              {...register("full-name", {
                required: "Full name is required",

                minLength: {
                  value: 5,
                  message: "Full name must be at least 5 characters",
                },
              })}
            />
            <Input
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              errors={errors}
              {...register("email", { required: "Email is required" })}
            />
            <div>
              <div className="flex items-center gap-x-3 flex-col md:flex-row space-y-6 md:space-y-0 ">
                <div className="w-full">
                  <Input
                    label="Country"
                    id="country"
                    name="country"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    errors={errors}
                    {...register("country", {
                      required: "Country is required",
                      minLength: {
                        value: 3,
                        message: "Country must be at least 3 characters",
                      },
                    })}
                  />
                </div>
                <div className="w-full">
                  <Input
                    id="contact"
                    label="Contact"
                    name="contact"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    errors={errors}
                    {...register("contact", {
                      required: "contact is required",
                      minLength: {
                        value: 10,
                        message: "Contact must be at least 10 digits",
                      },
                    })}
                  />
                </div>
              </div>
            </div>
            <Input
              id="sport"
              name="sport"
              label="Sport"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              errors={errors}
              {...register("sport", {
                required: "Sport is required",
                minLength: {
                  value: 3,
                  message: "Sport must be at least 3 characters",
                },
              })}
            />
            <div>
              <div className="flex items-center flex-col md:flex-row space-y-6 md:space-y-0 gap-x-3">
                <div className="w-full">
                  <Input
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    errors={errors}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                </div>
                <div className="w-full">
                  <Input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    label="Confirm password"
                    errors={errors}
                    {...register(
                      "cpassword",
                      {
                        required: "Confirm password is required",
                      },
                      (value) =>
                        value === password || "The passwords do not match"
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="flex disabled:bg-indigo-400 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading... " : "Create an account"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};


export default function Register() {
  return <RegisterSection />;
}
