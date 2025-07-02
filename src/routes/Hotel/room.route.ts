import { Router } from "express";
import { RoomController } from "@controllers/Hotel/room.controller";

const RoomRoutes = Router();
const controller = new RoomController();

RoomRoutes.get("/", (req, res) => controller.getAllRoomAsync(req, res));

RoomRoutes.get("/:id", (req, res) => controller.getRoomByID(req, res));

export default RoomRoutes;
