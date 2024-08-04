import express from "express";
import {
  addHotel,
  editHotelById,
  fetchHotelById,
  fetchHotels,
} from "../controllers/my_hotels.controller";
import { upload } from "../middleware/multer.middleware";
import verifyToken from "../middleware/auth.middleware";
import { validateHotel } from "../middleware/validators/hotel.validator";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  validateHotel,
  upload.array("imageFiles", 6),
  addHotel
);

router.get("/", verifyToken, fetchHotels);

router.get("/:id", verifyToken, fetchHotelById);

router.put("/:id", verifyToken, upload.array("imageFiles"), editHotelById);

export default router;
