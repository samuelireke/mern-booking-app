import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model";
import { HotelType } from "../shared/types";

export const addHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    // 1. upload the images to cloudinary
    const imageUrls = await uploadImages(imageFiles);

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

// fetch all user hotels
export const fetchHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel" });
  }
};

// fetch hotel by id
export const fetchHotelById = async (req: Request, res: Response) => {
  console.log(req.body);
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (error) {
    console.error("Error editing hotel: ", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

//edit hotel by id
export const editHotelById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    await res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};
