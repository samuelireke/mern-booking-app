import mongoose from "mongoose";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

export const initCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true,
    // url: "https://res.cloudinary.com/dq181h2oh/image/upload",
  });
  console.log("Cloudinary initialised");
};

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("DB Connected..."));
};
