import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import validator from "validator";
import * as apiClient from "../api-client";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      alert("Registration successful!");
    },
    onError: (error: Error) => {
      alert("Registration failed: " + error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const validatePassword = (value: string) => {
    if (
      !validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return "Password must contain at least 8 characters, including a mix of uppercase, lowercase, numbers, and symbols.";
    }
    return true;
  };

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
            validate: validatePassword,
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
