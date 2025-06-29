import { Router } from "express";
import { ReservationRepository } from "@infraestrucutre/repositories/ReservationModule/reservation.repository";
import { ReservationController } from "@controllers/ReservationModule/reservation.controller";
import { ReservationService } from "@application/services/ReservationModule/reservation.service";

const ReservationRoutes = Router();
const service = new ReservationService(new ReservationRepository());
const controller = new ReservationController(service);

ReservationRoutes.get("/", async (req, res) => {
  const result = await controller.getAllReservationAsync(req, res);
  res.json(result);
});

ReservationRoutes.get("/:id", async (req, res) => {
  const result = await controller.getReservationByIDAsync(req, res);
  res.json(result);
});

ReservationRoutes.post("/", async (req, res) => {
  const result = await controller.AddReservationAsync(req, res);
  res.json(result);
});

ReservationRoutes.put("/:id", async (req, res) => {
  const result = await controller.UpdateReservationAsync(req, res);
  res.json(result);
});

ReservationRoutes.delete("/:id", async (req, res) => {
  const result = await controller.DeleteReservationAsync(req, res);
  res.json(result);
});

ReservationRoutes.post("/available", async (req, res) => {
  const result = await controller.CheckRoomAvailabilityAsync(req, res);
  res.json(result);
});

export default ReservationRoutes;
