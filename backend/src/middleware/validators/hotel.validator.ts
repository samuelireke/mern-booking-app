import { body, check } from "express-validator";

export const validateHotel = [
  check("name", "Name is required").notEmpty(),
  check("city", "City is required").notEmpty(),
  check("country", "Country is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
  check("type", "Hotel type is required").notEmpty(),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  check("facilities", "Facilities are required").notEmpty().isArray(),
];
