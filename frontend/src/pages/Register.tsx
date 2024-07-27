import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { RegisterFormData } from "../utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormDataSchema } from "../utils/schemas/authFormSchema";

const Register = () => {
  const navigate = useNavigate();

  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormDataSchema),
  });

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration successful!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col  md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            {...register("firstName", { required: "This field is required" })}
            type="text"
            className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
          />
          {errors.firstName && (
            <span className="text-red-500 font-medium">
              {errors.firstName.message}{" "}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            {...register("lastName", { required: "This field is required" })}
            type="text"
            className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
          />
          {errors.lastName && (
            <span className="text-red-500 font-medium">
              {errors.lastName.message}{" "}
            </span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                ("Your password do not match.");
              }
            },
          })}
          type="password"
          className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 font-medium">
            {errors.confirmPassword.message}{" "}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
