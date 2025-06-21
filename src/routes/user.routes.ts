import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  res.json("success");
});

export default userRoutes;
