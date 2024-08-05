import { Router } from "express";
import authRoutes from "./auth.route";
import myHotelsRoutes from "./my_hotels.route";
import hotelRoutes from "./my_hotels.route";

const routes: { [key: string]: Router } = {
  auth: authRoutes,
  "my-hotels": myHotelsRoutes,
  hotels: hotelRoutes,
};
export default routes;
