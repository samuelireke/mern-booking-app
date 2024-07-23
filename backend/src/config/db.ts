import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("DB Connected..."));
};
