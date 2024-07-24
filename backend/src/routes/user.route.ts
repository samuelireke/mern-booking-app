import express from "express";
import { registerUser } from "../controllers/user.controller";
import validateUser from "../middleware/validators/user.validator";

const router = express.Router();

router.post("/register", validateUser, registerUser);

export default router;
