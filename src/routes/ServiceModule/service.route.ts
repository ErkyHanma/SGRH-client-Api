import { ServiceService } from "@application/services/ServiceModule/service.service";
import { ServiceController } from "@controllers/ServiceModule/service.controller";
import { ServiceRepository } from "@infraestrucutre/repositories/ServiceModule/service.repository";
import { Router } from "express";

const ServiceRoutes = Router();
const service = new ServiceService(new ServiceRepository());
const controller = new ServiceController(service);

ServiceRoutes.get("/", async (req, res) => {
  const result = await controller.getAllServicesAsync(req, res);
  res.json(result);
});

ServiceRoutes.get("/:id", async (req, res) => {
  const result = await controller.getServicesByIdAsync(req, res);
  res.json(result);
});

export default ServiceRoutes;
