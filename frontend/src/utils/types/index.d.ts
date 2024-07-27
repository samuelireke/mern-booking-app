import { z } from "zod";
import {
  RegisterFormDataSchema,
  SignInFormDataSchema,
} from "../schemas/authFormSchema";

export type RegisterFormData = z.infer<typeof RegisterFormDataSchema>;

export type SignInFormData = z.infer<typeof SignInFormDataSchema>;

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};
