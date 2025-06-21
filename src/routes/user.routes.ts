import { UserController } from "@controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  res.json("Good");
});

export default userRoutes;
