import { Router } from "express";
import userRoutes from "./UserManagement/user.routes";
import ReservationRoutes from "./ReservationModule/reservation.routes";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.json("Api is healthy");
  });

  router.use("/user", userRoutes);
  router.use("/reservation", ReservationRoutes);

  return router;
};
