import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import StarRating from "./StarRating";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          {...register("name", { required: "This field is required" })}
          type="text"
          className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
        />
        {errors.name && (
          <span className="text-red-500 font-medium">
            {errors.name.message}{" "}
          </span>
        )}
      </label>
      <div className="flex flex-col  md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            {...register("city", { required: "This field is required" })}
            type="text"
            className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
          />
          {errors.city && (
            <span className="text-red-500 font-medium">
              {errors.city.message}{" "}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            {...register("country", { required: "This field is required" })}
            type="text"
            className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
          />
          {errors.country && (
            <span className="text-red-500 font-medium">
              {errors.country.message}{" "}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          {...register("description", { required: "This field is required" })}
          rows={10}
          className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
        />
        {errors.description && (
          <span className="text-red-500 font-medium">
            {errors.description.message}{" "}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          {...register("pricePerNight", { required: "This field is required" })}
          type="number"
          min={1}
          className="w-full px-2 py-1 text-gray-700 font-normal border rounded border-gray-300 focus:outline focus:border-blue-600"
        />
        {errors.pricePerNight && (
          <span className="text-red-500 font-medium">
            {errors.pricePerNight.message}{" "}
          </span>
        )}
      </label>
      <StarRating />
    </div>
  );
};

export default DetailsSection;
