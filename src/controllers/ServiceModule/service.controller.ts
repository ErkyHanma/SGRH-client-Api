import { failure, success } from "@domain/entities/Base/OperationResult";
import { ServiceContainer } from "@infraestrucutre/DIContainers/service.container";

export class ServiceController {
  private readonly serviceService = ServiceContainer.getServiceService();

  public async getAllServicesAsync(req: any, res: any) {
    try {
      const services = await this.serviceService.getAllServiceAsync();

      if (!services.isSuccess) {
        return res.status(400).json(services.message);
      }

      return res.status(200).json(success(services.message, services.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }

  public async getServicesByIdAsync(req: any, res: any) {
    try {
      const services = await this.serviceService.getServiceByIdAsync(
        req.params.id
      );

      if (!services.isSuccess) {
        return res.status(400).json(services.message);
      }

      return res.status(200).json(success(services.message, services.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }
}
