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
      return res.status(400).send({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save();

    const token = createToken(user._id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
    });
    return res.status(200).send({ message: "User registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

// Login user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    const token = createToken(user._id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
    });

    res.status(200).send({ userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
export { registerUser, loginUser };
