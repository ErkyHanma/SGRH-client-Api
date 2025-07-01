import { ServiceController } from "@controllers/ServiceModule/service.controller";
import { Router } from "express";

const ServiceRoutes = Router();
const controller = new ServiceController();

ServiceRoutes.get("/", async (req, res) => {
  const result = await controller.getAllServicesAsync(req, res);
  res.json(result);
});

ServiceRoutes.get("/:id", async (req, res) => {
  const result = await controller.getServicesByIdAsync(req, res);
  res.json(result);
});

export default ServiceRoutes;
