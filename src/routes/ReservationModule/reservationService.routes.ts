import { Router } from "express";
import { ReservationServiceController } from "@controllers/ReservationModule/reservationService.controller";

const ReservationServicesRoutes = Router();
const controller = new ReservationServiceController();

ReservationServicesRoutes.post("/", async (req, res) => {
  const result = await controller.AddReservationServiceAsync(req, res);
  res.json(result);
});

ReservationServicesRoutes.post("/delete", async (req, res) => {
  const result = await controller.DeleteReservationServiceAsync(req, res);
  res.json(result);
});

export default ReservationServicesRoutes;
