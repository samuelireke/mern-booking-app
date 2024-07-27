import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { SignInFormData } from "../utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormDataSchema } from "../utils/schemas/authFormSchema";

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormDataSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      console.log("user signed in successfully");
      // 1. show taost
      // 2. navigate to the home page
    },
    onError: (error: Error) => {
      // show taost
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          {...register("email", { required: "This field is required" })}
          type="email"
          className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
        />
        {errors.email && (
          <span className="text-red-500 font-medium">
            {errors.email.message}{" "}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            validate: {
              uppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Password must contain at least one uppercase letter",
              lowercase: (value) =>
                /[a-z]/.test(value) ||
                "Password must contain at least one lowercase letter",
              digit: (value) =>
                /\d/.test(value) || "Password must contain at least one digit",
              symbol: (value) =>
                /[^A-Za-z0-9]/.test(value) ||
                "Password must contain at least one special character",
            },
          })}
          type="password"
          className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
        />
        {errors.password && (
          <span className="text-red-500 font-medium">
            {errors.password.message}{" "}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
