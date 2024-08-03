import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../utils/types";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Guests</h2>
      <div className="flex flex-col sm:flex-row gap-4 bg-gray-100 p-6 rounded-lg shadow-sm">
        <label className="flex-1 space-y-1">
          <span className="text-sm font-medium text-gray-700">Adults</span>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            min={1}
            {...register("adultCount")}
          />
          {errors.adultCount?.message && (
            <span className="text-xs text-red-500 mt-1">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex-1 space-y-1">
          <span className="text-sm font-medium text-gray-700">Children</span>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            min={0}
            {...register("childCount")}
          />
          {errors.childCount?.message && (
            <span className="text-xs text-red-500 mt-1">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
