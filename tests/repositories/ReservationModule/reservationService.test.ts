import { IReservationServiceRepository } from "@domain/interfaces/ReservationModuleTypes";
import { ReservationServiceBuilder } from "./EntityBuilder/reservationService.builder";
import { failure, success } from "@domain/entities/Base/OperationResult";

jest.mock("@infrastructure/database");
jest.mock("@infrastructure/mappers/reservationModule.mapper");

const _reservationServiceBuilder = new ReservationServiceBuilder();

export const mockReservationServiceRepository =
  (): jest.Mocked<IReservationServiceRepository> => ({
    AddAsync: jest.fn(),
    DeleteAsync: jest.fn(),
  });

describe("ReservationService Repository tests", () => {
  let mockReservationServiceRepo: jest.Mocked<IReservationServiceRepository>;

  beforeEach(() => {
    mockReservationServiceRepo = mockReservationServiceRepository();
  });

  describe("AddAsync", () => {
    it("should return true when success", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = success(`Service Limpiar added correctly`, true);

      mockReservationServiceRepo.AddAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationServiceRepo.AddAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(true);
      expect(result.message).toBe(`Service Limpiar added correctly`);
    });

    it("should return failure when service not found", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = failure<false>("This service does not exits");

      mockReservationServiceRepo.AddAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationServiceRepo.AddAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe("This service does not exits");
    });

    it("should return failure when service is already added", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = failure<false>(
        "This service is already added in the reservation"
      );

      mockReservationServiceRepo.AddAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationServiceRepo.AddAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "This service is already added in the reservation"
      );
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = failure<false>(
        `Something went wrong: Database connection failed`
      );

      mockReservationServiceRepo.AddAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationServiceRepo.AddAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("DeleteAsync", () => {
    it("should return true when success", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = success(`Service Limpiar deleted correctly`, true);

      mockReservationServiceRepo.DeleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationServiceRepo.DeleteAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(true);
      expect(result.message).toBe(`Service Limpiar deleted correctly`);
    });

    it("should return failure when service not found", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = failure<false>("This service does not exits");

      mockReservationServiceRepo.DeleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationServiceRepo.DeleteAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe("This service does not exits");
    });

    it("should return failure when service is not added", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = failure<false>(
        "This service is not added in the reservation"
      );

      mockReservationServiceRepo.DeleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationServiceRepo.DeleteAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "This service is not added in the reservation"
      );
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = failure<false>(
        `Something went wrong: Database connection failed`
      );

      mockReservationServiceRepo.DeleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationServiceRepo.DeleteAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });
});
