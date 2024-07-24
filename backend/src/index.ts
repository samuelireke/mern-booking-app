import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db";
import routes from "./routes";

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

for (const [route, handler] of Object.entries(routes)) {
  app.use(`/api/${route}`, handler);
}
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
