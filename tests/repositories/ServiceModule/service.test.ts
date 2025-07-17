import { jest } from "@jest/globals";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { IServiceRepository } from "@domain/interfaces/ServiceModuleTypes";
import { Service } from "@domain/entities/ServiceModule/Service";
import { ServiceBuilder } from "./EntityBuilder/service.builder";

// Mock the database and mapper dependencies
jest.mock("@infrastructure/database");
jest.mock("@infrastructure/mappers/serviceModule.mapper");

const _serviceBuilder = new ServiceBuilder();

export const mockServiceRepository = (): jest.Mocked<IServiceRepository> => ({
  getAllAsync: jest.fn(),
  getByIdAsync: jest.fn(),
});

describe("serviceRepository Tests", () => {
  let mockServiceRepo: jest.Mocked<IServiceRepository>;

  beforeEach(() => {
    mockServiceRepo = mockServiceRepository();
  });

  describe("getAllAsync", () => {
    it("should return all services successfully", async () => {
      // Arrange
      const mockServices: Service[] = [
        _serviceBuilder.build(),
        _serviceBuilder.build(),
      ];
      const mockResult = success(
        "Services retrieve successfully",
        mockServices
      );

      mockServiceRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockServiceRepo.getAllAsync();

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockServices);
      expect(result.message).toBe("Services retrieve successfully");
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const mockError = failure<Service[]>(
        "Something went wrong: Database connection failed"
      );

      mockServiceRepo.getAllAsync.mockResolvedValue(mockError);

      // Act
      const result = await mockServiceRepo.getAllAsync();

      // Assert
      expect(result).toEqual(mockError);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "Something went wrong: Database connection failed"
      );
    });
  });

  describe("getByIdAsync", () => {
    it("should return service when found", async () => {
      // Arrange
      const serviceId = 1;
      const mockService = _serviceBuilder.withServiceId(serviceId).build();

      const mockResult = success(
        `Service ${mockService.serviceId} retrieved successfully`,
        mockService
      );

      mockServiceRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockServiceRepo.getByIdAsync(serviceId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockService);
      expect(result.message).toBe(
        `Service ${mockService.serviceId} retrieved successfully`
      );
    });

    it("should return failure when service not found", async () => {
      // Arrange
      const serviceId = 1;
      const mockResult = failure<Service>(
        `Service with id ${serviceId} not found`
      );

      mockServiceRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockServiceRepo.getByIdAsync(serviceId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Service with id ${serviceId} not found`);
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const serviceId = 1;
      const mockResult = failure<Service>(
        `Something went wrong: Database connection failed`
      );

      mockServiceRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockServiceRepo.getByIdAsync(serviceId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });
});
