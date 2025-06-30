import { Router } from "express";
import { RoomService } from "@application/services/Hotel/room.service";
import { RoomRepository } from "@infraestrucutre/repositories/Hotel/room.repository";
import { RoomController } from "@controllers/Hotel/room.controller";

const RoomRoutes = Router();
const service = new RoomService(new RoomRepository());
const controller = new RoomController(service);

RoomRoutes.get("/", async (req, res) => {
  const result = await controller.getAllRoomAsync(req, res);
  res.json(result);
});

RoomRoutes.get("/:id", async (req, res) => {
  const result = await controller.getRoomByID(req, res);
  res.json(result);
});

export default RoomRoutes;
