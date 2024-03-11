"use client";

import axios from "../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/auth";

/** @description A custom hook to handle authentication requests
 * @returns {Object} - An object containing the following properties:
 * - loading: A boolean indicating if the request is still loading
 * - data: The data returned from the request
 * - error: A string containing the error message
 * - signIn: A function to sign in a user
 * - signUp: A function to sign up a user
 */

const useAuthFetch = () => {
  const { signInUser } = useAuth();
  const {
    mutate: signInMutate,
    data,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post("/auth/signin", values);
      return data;
    },
    onSuccess: (data) => {
      const token = data.payload.data.accessToken;
      const role = data.payload.data.role || "user";

      signInUser(token, role);
    },
    onError: (error) => {
      console.log("Error while login", error);
    },
  });

  const signUp = async ({ email, password, name, country, contact, sport }) => {
    try {
      setLoading(true);
      const res = await axios.post("/auth/signup", {
        email,
        sport,
        password,
        country,
        phone: contact,
        name,
      });
      console.log("successfull", res?.data?.payload);
      setData(res?.data?.payload);
    } catch (error) {
      setError(error?.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const signIn = async ({ email, password }) => {
    signInMutate({ email, password });
  };
  return {
    signInData: data,
    loading: isPending,
    isError,
    error,
    signIn,
    isSuccess,
    signUp,
  };
};

export default useAuthFetch;
