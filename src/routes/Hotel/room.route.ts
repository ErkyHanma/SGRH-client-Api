import { Router } from "express";
import { RoomController } from "@controllers/Hotel/room.controller";

const RoomRoutes = Router();
const controller = new RoomController();

RoomRoutes.get("/", async (req, res) => {
  const result = await controller.getAllRoomAsync(req, res);
  res.json(result);
});

RoomRoutes.get("/:id", async (req, res) => {
  const result = await controller.getRoomByID(req, res);
  res.json(result);
});

export default RoomRoutes;
