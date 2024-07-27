import express from "express";
import {
  loginUser,
  registerUser,
  validateToken,
} from "../controllers/auth.controller";
import {
  validateLogin,
  validateUser,
} from "../middleware/validators/auth.validator";
import verifyToken from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/validate-token", verifyToken, validateToken);

export default router;
