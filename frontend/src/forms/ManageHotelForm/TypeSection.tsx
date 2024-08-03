import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "../../utils/types";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeValue = watch("type");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Type</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2">
          {hotelTypes.map((type) => (
            <label
              key={type}
              className={`
                cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                ${
                  typeValue === type
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              <input
                type="radio"
                value={type}
                {...register("type")}
                className="hidden"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
      {errors.type && (
        <p className="text-xs text-red-500 mt-1">{errors.type.message}</p>
      )}
    </div>
  );
};

export default TypeSection;
