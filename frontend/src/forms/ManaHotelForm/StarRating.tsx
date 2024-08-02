import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { HotelFormData } from "../../utils/types";

const StarRating = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const ratingValue = watch("starRating");
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Star Rating
      </label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            type="button"
            className="focus:outline-none focus:text-yellow-400 rounded-full p-1 transition-colors duration-200"
            onClick={() =>
              setValue("starRating", index, { shouldValidate: true })
            }
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            aria-label={`Rate ${index} star${index !== 1 ? "s" : ""}`}
          >
            <FaStar
              className={`w-8 h-8 ${
                index <= (hover ?? ratingValue ?? 0)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        {ratingValue && (
          <span className="ml-2 text-sm text-gray-600">({ratingValue})</span>
        )}
      </div>
      <input
        type="number"
        className="hidden"
        {...register("starRating", {
          required: "Please select a star rating",
        })}
      />
      {errors.starRating && (
        <p className="text-sm text-red-600 mt-1">{errors.starRating.message}</p>
      )}
    </div>
  );
};

export default StarRating;
