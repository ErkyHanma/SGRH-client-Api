import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  res.json("Here's a user");
});

export default userRoutes;
