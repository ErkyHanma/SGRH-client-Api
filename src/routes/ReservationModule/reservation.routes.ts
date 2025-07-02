import { Router } from "express";
import { ReservationController } from "@controllers/ReservationModule/reservation.controller";

const ReservationRoutes = Router();
const controller = new ReservationController();

ReservationRoutes.get("/", (req, res) =>
  controller.getAllReservationAsync(req, res)
);

ReservationRoutes.get("/:id", (req, res) =>
  controller.getReservationByIDAsync(req, res)
);

ReservationRoutes.get("/user/:id", (req, res) =>
  controller.getAllReservationByIDAsync(req, res)
);

ReservationRoutes.post("/", (req, res) =>
  controller.AddReservationAsync(req, res)
);

ReservationRoutes.put("/:id", (req, res) =>
  controller.UpdateReservationAsync(req, res)
);

ReservationRoutes.delete("/:id", (req, res) =>
  controller.DeleteReservationAsync(req, res)
);

ReservationRoutes.post("/available", (req, res) =>
  controller.CheckRoomAvailabilityAsync(req, res)
);

export default ReservationRoutes;
