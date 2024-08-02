import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../utils/types";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-6 flex flex-row sm:flex-col gap-4  bg-gray-100 rounded-lg shadow-sm">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("imageFiles", {
            required: "Please select at least one image",
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0)
                return "At least one image should be added";
              if (totalLength > 6)
                return "Total number of images cannot exceed 6";

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-sm text-red-600">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
