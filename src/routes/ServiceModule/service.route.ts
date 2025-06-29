import { ServiceService } from "@application/services/ServiceModule/service.service";
import { ServiceController } from "@controllers/ServiceModule/service.controller";
import { ServiceRepository } from "@infraestrucutre/repositories/ServiceModule/service.repository";
import { Router } from "express";

const ServiceRoute = Router();
const service = new ServiceService(new ServiceRepository());
const controller = new ServiceController(service);

ServiceRoute.get("/", async (req, res) => {
  const result = await controller.getAllServicesAsync(req, res);
  res.json(result);
});

ServiceRoute.get("/:id", async (req, res) => {
  const result = await controller.getServicesByIdAsync(req, res);
  res.json(result);
});

export default ServiceRoute;
