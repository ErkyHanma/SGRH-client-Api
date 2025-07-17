import {
  IReservationServiceRepository,
  IReservationServiceService,
} from "@domain/interfaces/ReservationModuleTypes";
import { failure, success } from "@domain/entities/Base/OperationResult";
import { ReservationServiceBuilder } from "../../repositories/ReservationModule/EntityBuilder/reservationService.builder";
import { ILogger } from "@domain/interfaces/ILogger";
import { ReservationServiceService } from "@application/services/ReservationModule/reservationService.service";

jest.mock("@infrastructure/database");
jest.mock("@infrastructure/mappers/reservationModule.mapper");

const _reservationServiceBuilder = new ReservationServiceBuilder();

export const mockReservationServiceRepository =
  (): jest.Mocked<IReservationServiceRepository> => ({
    AddAsync: jest.fn(),
    DeleteAsync: jest.fn(),
  });

describe("ReservationService service tests", () => {
  let mockReservationServiceRepo: jest.Mocked<IReservationServiceRepository>;
  let _logger: jest.Mocked<ILogger>;
  let reservationServiceService: ReservationServiceService;

  beforeEach(() => {
    mockReservationServiceRepo = mockReservationServiceRepository();

    _logger = {
      Info: jest.fn(),
      Error: jest.fn(),
    };

    reservationServiceService = new ReservationServiceService(
      mockReservationServiceRepo,
      _logger
    );
  });

  describe("AddReservationServiceAsync", () => {
    it("should return true when success", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = success(`Service Limpiar added correctly`, true);

      mockReservationServiceRepo.AddAsync.mockResolvedValue(mockResult);
      // Act
      const result = await reservationServiceService.AddReservationServiceAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(true);
      expect(result.message).toBe(`Service Limpiar added correctly`);
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = failure<false>(`Service not found`);

      mockReservationServiceRepo.AddAsync.mockResolvedValue(mockResult);
      // Act
      const result = await reservationServiceService.AddReservationServiceAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Service not found`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;
      const mockReservationService = _reservationServiceBuilder.build();

      mockReservationServiceRepo.AddAsync.mockRejectedValue(
        new Error(errorMessage)
      );
      // Act
      const result = await reservationServiceService.AddReservationServiceAsync(
        mockReservationService
      );

      // Assert
      expect(mockReservationServiceRepo.AddAsync).toHaveBeenCalledTimes(1);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("DeleteReservationServiceAsync", () => {
    it("should return true when success", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = success(`Service Limpiar deleted correctly`, true);

      mockReservationServiceRepo.DeleteAsync.mockResolvedValue(mockResult);
      // Act
      const result =
        await reservationServiceService.DeleteReservationServiceAsync(
          mockReservationService
        );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(true);
      expect(result.message).toBe(`Service Limpiar deleted correctly`);
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const mockReservationService = _reservationServiceBuilder.build();
      const mockResult = failure<false>(`Service not found`);

      mockReservationServiceRepo.DeleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await reservationServiceService.DeleteReservationServiceAsync(
        mockReservationService
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Service not found`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;
      const mockReservationService = _reservationServiceBuilder.build();

      mockReservationServiceRepo.DeleteAsync.mockRejectedValue(
        new Error(errorMessage)
      );
      // Act
      const result = await reservationServiceService.DeleteReservationServiceAsync(
        mockReservationService
      );

      // Assert
      expect(mockReservationServiceRepo.DeleteAsync).toHaveBeenCalledTimes(1);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(expectedMessage);
    });
  });
});
