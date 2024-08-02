import { useFormContext } from "react-hook-form";
import StarRating from "./StarRating";
import { HotelFormData } from "../../utils/types";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const inputClass =
    "w-full px-3 py-2 text-gray-700 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200";
  const labelClass = "block text-gray-700 text-sm font-medium mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Add Hotel</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Hotel name is required" })}
            type="text"
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              {...register("city", { required: "City is required" })}
              type="text"
              className={inputClass}
            />
            {errors.city && <p className={errorClass}>{errors.city.message}</p>}
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>
              Country
            </label>
            <input
              id="country"
              {...register("country", { required: "Country is required" })}
              type="text"
              className={inputClass}
            />
            {errors.country && (
              <p className={errorClass}>{errors.country.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            rows={5}
            className={`${inputClass} resize-vertical`}
          />
          {errors.description && (
            <p className={errorClass}>{errors.description.message}</p>
          )}
        </div>

        <div className="max-w-xs">
          <label htmlFor="pricePerNight" className={labelClass}>
            Price Per Night
          </label>
          <input
            id="pricePerNight"
            {...register("pricePerNight", {
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" },
            })}
            type="number"
            min={1}
            className={inputClass}
          />
          {errors.pricePerNight && (
            <span className={errorClass}>{errors.pricePerNight.message}</span>
          )}
        </div>

        <StarRating />
      </div>
    </div>
  );
};

export default DetailsSection;
