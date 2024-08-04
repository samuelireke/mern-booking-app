import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../utils/types";
import React from "react";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls?.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-6 flex flex-col gap-4  bg-gray-100 rounded-lg shadow-sm">
        {existingImageUrls && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-between">
            {existingImageUrls.map((url, index) => (
              <div className="relative group" key={index}>
                <img
                  src={url}
                  alt={url.split("/")[0]}
                  className="min-h-full object-cover"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                  onClick={(event) => handleDelete(event, url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("imageFiles")}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-xs text-red-500 mt-1">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
