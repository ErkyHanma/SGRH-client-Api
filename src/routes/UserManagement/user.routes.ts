import { UserController } from "@controllers/UserManagement/user.controller";
import { Router } from "express";

const userRoutes = Router();
const controller = new UserController();

userRoutes.get("/", async (req, res) => {
  const result = await controller.getAllUserAsync(req, res);
  res.json(result);
});

userRoutes.get("/:id", async (req, res) => {
  const result = await controller.getUserByIDAsync(req, res);
  res.json(result);
});

userRoutes.get("/email/:email", async (req, res) => {
  const result = await controller.getUserEmailAsync(req, res);
  res.json(result);
});

userRoutes.post("/", async (req, res) => {
  const result = await controller.AddUserAsync(req, res);
  res.json(result);
});

userRoutes.put("/:id", async (req, res) => {
  const result = await controller.UpdateUserAsync(req, res);
  res.json(result);
});

userRoutes.delete("/:id", async (req, res) => {
  const result = await controller.DeleteUserAsync(req, res);
  res.json(result);
});

export default userRoutes;
