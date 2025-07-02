import { UserController } from "@controllers/UserManagement/user.controller";
import { Router } from "express";

const userRoutes = Router();
const controller = new UserController();

userRoutes.get("/", async (req, res) => controller.getAllUserAsync(req, res));

userRoutes.get("/:id", async (req, res) =>
  controller.getUserByIDAsync(req, res)
);

userRoutes.get("/email/:email", async (req, res) =>
  controller.getUserEmailAsync(req, res)
);

userRoutes.post("/", async (req, res) => controller.AddUserAsync(req, res));

userRoutes.put("/:id", async (req, res) =>
  controller.UpdateUserAsync(req, res)
);

userRoutes.delete("/:id", async (req, res) =>
  controller.DeleteUserAsync(req, res)
);

export default userRoutes;
