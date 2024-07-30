import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb3"> Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300 ">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            className="border rounded w-full py-2 px-3 font normal"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
              validate: (value: number) => {
                if (value >= 0) return true;
                return "Adults must be at least 1";
              },
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-medium">
              {" "}
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            className="border rounded w-full py-2 px-3 font normal"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-medium">
              {" "}
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
