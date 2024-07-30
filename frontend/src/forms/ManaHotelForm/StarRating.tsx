import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { HotelFormData } from "./ManageHotelForm";

const StarRating = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const ratingValue = watch("starRating");

  const [hover, setHover] = useState(0); // default to 0

  return (
    <div>
      <p className="mr-2 mb-2 text-gray-700 text-sm font-bold">Star Rating</p>
      <label className="flex items-center gap-5 text-gray-700 text-sm font-bold ">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className=""
            {...register("starRating", {
              required: "This field is required",
            })}
          >
            <FaStar
              className={`text-lg md:text-2xl cursor-pointer outline-none ${
                index <= (hover || ratingValue)
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={() => setValue("starRating", index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(0)}
              aria-label={`Rate ${index} stars out of 5`}
              role="button"
              tabIndex={0}
            />
          </div>
        ))}
        {ratingValue && (
          <span className="ml-2 text-sm text-gray-600">
            ({getValues("starRating")})
          </span>
        )}
      </label>
      {errors.starRating && (
        <span className="text-red-500 font-medium">
          {errors.starRating.message}{" "}
        </span>
      )}
    </div>
  );
};

export default StarRating;
