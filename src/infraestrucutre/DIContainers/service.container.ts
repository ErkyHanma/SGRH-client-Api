import { ServiceService } from "@application/services/ServiceModule/service.service";
import { Logger } from "@infraestrucutre/logger/logger";
import { ServiceRepository } from "@infraestrucutre/repositories/ServiceModule/service.repository";

class ServiceContainer {
  private static logger = new Logger();
  private static serviceRepository = new ServiceRepository(
    ServiceContainer.logger
  );

  static getServiceRepository() {
    return this.serviceRepository;
  }

  static getServiceService() {
    return new ServiceService(this.getServiceRepository(), this.logger);
  }
}

export { ServiceContainer };
