import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route";
import { connectDB } from "./config/db";

// check db connection
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// test api endpoint
app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from api" });
});

app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
