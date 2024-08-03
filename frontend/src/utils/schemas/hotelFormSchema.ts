import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const HotelFormDataSchema = z.object({
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
  imageFiles: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "An image is required")
    .refine(
      (files) => files?.length <= 6,
      "Total number of images cannot exceed 6"
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Only image files are allowed."
    ),
  adultCount: z.coerce.number().min(1, "Adults must be at least 1"),
  childCount: z.coerce.number().optional(),
});
