import { Router } from "express";
import { ReservationController } from "@controllers/ReservationModule/reservation.controller";
import { ReservationService } from "@application/services/ReservationModule/reservation.service";
import { ReservationServiceRepository } from "@infraestrucutre/repositories/ReservationModule/reservationService.repository";
import { ReservationServiceService } from "@application/services/ReservationModule/reservationService.service";
import { ReservationServiceController } from "@controllers/ReservationModule/reservationService.controller";

const ReservationServicesRoutes = Router();
const service = new ReservationServiceService(
  new ReservationServiceRepository()
);
const controller = new ReservationServiceController(service);

ReservationServicesRoutes.post("/", async (req, res) => {
  const result = await controller.AddReservationServiceAsync(req, res);
  res.json(result);
});

ReservationServicesRoutes.post("/delete", async (req, res) => {
  const result = await controller.DeleteReservationServiceAsync(req, res);
  res.json(result);
});

export default ReservationServicesRoutes;
