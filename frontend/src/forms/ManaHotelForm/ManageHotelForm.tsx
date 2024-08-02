import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import TypeSection from "./TypeSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelFormDataSchema } from "../../utils/schemas/hotelFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HotelFormData } from "../../utils/types";

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>({
    resolver: zodResolver(HotelFormDataSchema),
  });
  const {
    handleSubmit,
    // formState: { isValid, isDirty },
  } = formMethods;
  const onSubmit = handleSubmit((formData: HotelFormData) => {
    // create new FormData object & call API
    console.log(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10 p-5 sm:p-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        {/* <span className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Save
          </button>
        </span> */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            // disabled={!isValid || !isDirty}
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
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
