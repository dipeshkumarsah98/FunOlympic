"use client";
import Input from "@/components/common/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Snackbar from "@/components/common/snackbar";
import useAuth from "@/lib/hooks/useAuth";

// register form for sport live platform
const RegisterSection = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting, isValid } = formState;
  const { data, error, signUp } = useAuth();
  const onSubmit = handleSubmit(async (credentials) => {
    try {
      await signUp({
        name: credentials["full-name"],
        email: credentials.email,
        country: credentials.country,
        password: credentials.password,
        contact: credentials.contact,
        sport: credentials.sport,
      });
      if (data) {
        console.log("data is", data);
        Snackbar.success("Account Created successfully");
        return;
      }
      if (error) {
        console.log("Error is", error);
        Snackbar.error(error);
        return;
      }
      console.log(credentials);
    } catch (error) {
      if (error) {
        console.log("Error is", error);
        Snackbar.error(error);
        return;
      }
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
              {...register("full-name", { required: "Full name is required" })}
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
                    })}
                  />
                </div>
                <div className="w-full">
                  <Input
                    id="cpassword"
                    name="cpassword"
                    type="cpassword"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    label="Confirm password"
                    errors={errors}
                    {...register("cpassword", {
                      required: "confirm password is required",
                    })}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex disabled:bg-indigo-400 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!isValid}
              >
                Create an account
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

export default RegisterSection;
