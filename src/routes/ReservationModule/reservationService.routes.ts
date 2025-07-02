import { Router } from "express";
import { ReservationServiceController } from "@controllers/ReservationModule/reservationService.controller";

const ReservationServicesRoutes = Router();
const controller = new ReservationServiceController();

ReservationServicesRoutes.post("/", (req, res) =>
  controller.AddReservationServiceAsync(req, res)
);

ReservationServicesRoutes.post("/delete", (req, res) =>
  controller.DeleteReservationServiceAsync(req, res)
);

export default ReservationServicesRoutes;
