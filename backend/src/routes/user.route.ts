import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import {
  validateLogin,
  validateUser,
} from "../middleware/validators/user.validator";

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
