import { Router } from "express";
import authRoutes from "./auth.route";
import myHotelsRoute from "./my_hotels.route";

const routes: { [key: string]: Router } = {
  auth: authRoutes,
  "my-hotels": myHotelsRoute,
};
export default routes;
