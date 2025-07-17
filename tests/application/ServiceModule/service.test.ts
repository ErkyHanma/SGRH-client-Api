import { ILogger } from "@domain/interfaces/ILogger";
import { failure, success } from "@domain/entities/Base/OperationResult";
import { ServiceBuilder } from "../../repositories/ServiceModule/EntityBuilder/service.builder";
import { IServiceRepository } from "@domain/interfaces/ServiceModuleTypes";
import { ServiceService } from "@application/services/ServiceModule/service.service";
import { ServiceMapper } from "@infrastructure/mappers/serviceModule.mapper";
import { Service } from "@domain/entities/ServiceModule/Service";

jest.mock("@infrastructure/database");
jest.mock("@infrastructure/mappers/serviceModule.mapper");

const _serviceBuilder = new ServiceBuilder();

export const mockServiceRepository = (): jest.Mocked<IServiceRepository> => ({
  getAllAsync: jest.fn(),
  getByIdAsync: jest.fn(),
});

describe("Service service tests", () => {
  let mockServiceRepo: jest.Mocked<IServiceRepository>;
  let _logger: jest.Mocked<ILogger>;
  let serviceService: ServiceService;

  beforeEach(() => {
    mockServiceRepo = mockServiceRepository();

    _logger = {
      Info: jest.fn(),
      Error: jest.fn(),
    };

    serviceService = new ServiceService(mockServiceRepo, _logger);
  });

  describe("getAllServiceAsync", () => {
    it("should return services dtos when success", async () => {
      // Arrange
      const mockServices = [_serviceBuilder.build(), _serviceBuilder.build()];
      const mockResult = success(
        "Services retrieve successfully",
        mockServices
      );

      mockServiceRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await serviceService.getAllServiceAsync();

      // Assert
      expect(mockServiceRepo.getAllAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data?.map((service) => ServiceMapper.toDto(service)),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(
        mockServices.map((service) => ServiceMapper.toDto(service))
      );
      expect(result.message).toBe("Services retrieve successfully");
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const mockResult = failure<Service[]>(
        "Something went wrong: Database connection failed"
      );

      mockServiceRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await serviceService.getAllServiceAsync();

      // Assert
      expect(mockServiceRepo.getAllAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "Something went wrong: Database connection failed"
      );
    });
  });

  describe("getserviceByID", () => {
    it("should return service dto when success", async () => {
      // Arrange
      const serviceId = 1;
      const mockservice = _serviceBuilder.withServiceId(serviceId).build();
      const mockResult = success("service retrieve successfully", mockservice);

      mockServiceRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await serviceService.getServiceByIdAsync(serviceId);

      // Assert
      expect(mockServiceRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data && ServiceMapper.toDto(mockResult.data),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("service retrieve successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const serviceId = 1;
      const mockResult = failure<Service>(
        `service with id ${serviceId} not found`
      );

      mockServiceRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await serviceService.getServiceByIdAsync(serviceId);

      // Assert
      expect(mockServiceRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`service with id ${serviceId} not found`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const serviceId = 1;
      const mockResult = failure<Service>(
        `"Something went wrong: Database connection failed`
      );

      mockServiceRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await serviceService.getServiceByIdAsync(serviceId);

      // Assert
      expect(mockServiceRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `"Something went wrong: Database connection failed`
      );
    });
  });
});
