import { ServiceService } from "@application/services/ServiceModule/service.service";
import { ServiceRepository } from "@infraestrucutre/repositories/ServiceModule/service.repository";

class ServiceContainer {
  private static serviceRepository = new ServiceRepository();

  static getServiceRepository() {
    return this.serviceRepository;
  }

  static getServiceService() {
    return new ServiceService(this.getServiceRepository());
  }
}

export { ServiceContainer };
