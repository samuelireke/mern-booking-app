import { z } from "zod";
import {
  RegisterFormDataSchema,
  SignInFormDataSchema,
} from "../schemas/authFormSchema";
import { HotelFormDataSchema } from "../schemas/hotelFormSchema";

export type RegisterFormData = z.infer<typeof RegisterFormDataSchema>;

export type SignInFormData = z.infer<typeof SignInFormDataSchema>;

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type HotelFormData = z.infer<typeof HotelFormDataSchema>;
