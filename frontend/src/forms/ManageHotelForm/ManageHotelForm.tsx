import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import TypeSection from "./TypeSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelFormDataSchema } from "../../utils/schemas/hotelFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HotelFormData } from "../../utils/types";
import { useEffect } from "react";
import { HotelType } from "../../../../backend/src/shared/types";

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  // Set default form values for starRating and facilities
  const defaultValues = {
    starRating: 3,
    facilities: [],
  };

  const formMethods = useForm<HotelFormData>({
    resolver: zodResolver(HotelFormDataSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    console.log(formDataJson);

    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    // Add string and number fields to FormData as strings
    Object.entries(formDataJson).forEach(([key, value]) => {
      if (typeof value !== "object") {
        formData.append(key, value.toString());
      }
    });
    // Append facilities array
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }
    // Append images
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  // clear form input after successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10 p-5 sm:p-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className=" 
              bg-blue-600 
              text-white 
              px-6 
              py-2 
              rounded-md 
              font-semibold 
              text-lg
              hover:bg-blue-700 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:ring-offset-2 
              transition-colors 
              duration-200
              disabled:bg-gray-400 
              disabled:cursor-not-allowed
              "
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
