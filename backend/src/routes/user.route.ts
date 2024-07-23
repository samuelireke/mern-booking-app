import express, { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    console.log("***");
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
