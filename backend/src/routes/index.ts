import { Router } from "express";
import userRoutes from "./user.route";

const routes: { [key: string]: Router } = {
  users: userRoutes,
};
export default routes;
