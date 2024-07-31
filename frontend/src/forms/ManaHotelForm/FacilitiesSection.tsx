import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Facilities</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2">
          {hotelFacilities.map((facility, index) => (
            <label
              key={index}
              className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 hover:border-blue-500 transition cursor-pointer"
            >
              <input
                type="checkbox"
                value={facility}
                className="form-checkbox h-4 w-4 text-blue-600 rounded-full mr-2"
                {...register("facilities", {
                  validate: (facilities) =>
                    (facilities && facilities.length > 0) ||
                    "At least one facility must be selected.",
                })}
              />
              <span className="text-sm text-gray-700">{facility}</span>
            </label>
          ))}
        </div>
      </div>
      {errors.facilities && (
        <p className="text-sm text-red-600 mt-2">{errors.facilities.message}</p>
      )}
    </div>
  );
};

export default FacilitiesSection;
