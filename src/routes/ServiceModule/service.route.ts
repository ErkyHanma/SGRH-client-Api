import { ServiceController } from "@controllers/ServiceModule/service.controller";
import { Router } from "express";

const ServiceRoutes = Router();
const controller = new ServiceController();

ServiceRoutes.get("/", (req, res) => controller.getAllServicesAsync(req, res));

ServiceRoutes.get("/:id", async (req, res) =>
  controller.getServicesByIdAsync(req, res)
);

export default ServiceRoutes;
