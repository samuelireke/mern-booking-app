import express from "express";
import { fetchHotelsWithPagination } from "../controllers/hotel.controller";

const router = express.Router();

router.get("/search", fetchHotelsWithPagination);

export default router;
