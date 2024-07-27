import { Router } from "express";
import authRoutes from "./auth.route";

const routes: { [key: string]: Router } = {
  auth: authRoutes,
};
export default routes;
