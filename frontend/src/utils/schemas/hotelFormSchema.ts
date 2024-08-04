import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TOTAL_IMAGES = 6;

export const HotelFormDataSchema = z
  .object({
    name: z.string().min(1, "Hotel name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    description: z.string().min(1, "Description is required"),
    type: z.string({ message: "Type is required" }),
    pricePerNight: z.coerce.number().min(1, "Price Per Night is required"),
    starRating: z.coerce
      .number()
      .min(1, "Please select a star rating")
      .max(5, "Star rating must be at most 5"),
    facilities: z.string().array().nonempty({
      message: "At least one facility must be selected",
    }),
    imageFiles: z.custom<FileList>(),
    imageUrls: z.string().array().nullable().optional(),
    adultCount: z.coerce.number().min(1, "Adults must be at least 1"),
    childCount: z.coerce.number().optional(),
  })
  .refine(
    (data) => {
      const totalImages =
        (data.imageFiles?.length || 0) + (data.imageUrls?.length || 0);
      return totalImages <= MAX_TOTAL_IMAGES;
    },
    {
      message: `Total number of images cannot exceed ${MAX_TOTAL_IMAGES}`,
      path: ["imageFiles"],
    }
  )
  .refine(
    (data) => {
      const totalImages =
        (data.imageFiles?.length || 0) + (data.imageUrls?.length || 0);
      return totalImages > 0;
    },
    { message: "An image is required", path: ["imageFiles"] }
  )
  .refine(
    (data) => {
      if (!data.imageFiles) return true;
      return Array.from(data.imageFiles).every(
        (file) => file.size <= MAX_FILE_SIZE
      );
    },
    { message: "Each file must be no larger than 5MB", path: ["imageFiles"] }
  )
  .refine(
    (data) => {
      if (!data.imageFiles) return true;
      return Array.from(data.imageFiles).every((file) =>
        file.type.startsWith("image/")
      );
    },
    { message: "Only image files are allowed.", path: ["imageFiles"] }
  );
