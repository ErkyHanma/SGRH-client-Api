import { Router } from "express";
import userRoutes from "./UserManagement/user.routes";
import ReservationRoutes from "./ReservationModule/reservation.routes";
import ReservationServicesRoutes from "./ReservationModule/reservationService.routes";
import ServiceRoute from "./ServiceModule/service.route";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.json("Api is healthy");
  });

  router.use("/user", userRoutes);
  router.use("/reservation", ReservationRoutes);
  router.use("/reservationService", ReservationServicesRoutes);
  router.use("/service", ServiceRoute);

  return router;
};
