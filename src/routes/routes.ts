import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.json("Api is healthy");
  });

  router.use("/user", userRoutes);

  return router;
};
