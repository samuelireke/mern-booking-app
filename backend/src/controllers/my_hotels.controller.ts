import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";

export const addHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    // 1. upload the images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);

    // 2. if upload was successful, add the URLs to the new hotel
    newHotel.imageUrls = imageUrls;
    // newHotel.lastUpdated = new Date()
    if (!req.userId) return res.status(401).json({ message: "Unauthorised" });
    newHotel.userId = req.userId;

    // 3. save the new hotel to the database
    const hotel = new Hotel(newHotel);
    await hotel.save();

    // 4. return a 201 status
    res.status(201).json(hotel);
  } catch (error) {
    console.error("Error creating hotel: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
