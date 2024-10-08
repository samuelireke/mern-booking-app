import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import "dotenv/config";

// jwt token
const createToken = (id: string) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });
};

const registerUser = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save();

    const token = createToken(user._id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // in milliseconds
    });
    return res.status(200).json({ message: "User registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = createToken(user._id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// validate Token
const validateToken = (req: Request, res: Response) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorised" });
  res.status(200).json({ userId: req.userId });
};

// Logout User
const logoutUser = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
};

// Forgot Password
const forgotPassword = (req: Request, res: Response) => {
  // Logic to handle forgot password
};

// Reset Password
const resetPassword = (req: Request, res: Response) => {
  // Logic to reset password
};

// Verify Email
const verifyEmail = (req: Request, res: Response) => {
  // Logic to verify email
};
export { registerUser, loginUser, validateToken, logoutUser };
