import { ILogger } from "@domain/interfaces/ILogger";
import { failure, success } from "@domain/entities/Base/OperationResult";
import { ReservationBuilder } from "../../repositories/ReservationModule/EntityBuilder/reservation.builder";
import { IReservationRepository } from "@domain/interfaces/ReservationModuleTypes";
import { ReservationService } from "@application/services/ReservationModule/reservation.service";
import { ReservationMapper } from "@infrastructure/mappers/reservationModule.mapper";
import { ReservationWithName } from "@infrastructure/repositories/ReservationModule/reservation.repository";
import { mock } from "node:test";

jest.mock("@infrastructure/database");
jest.mock("@infrastructure/mappers/reservationModule.mapper");
const _reservationBuilder = new ReservationBuilder();

export const mockReservationRepository =
  (): jest.Mocked<IReservationRepository> => ({
    getAllAsync: jest.fn(),
    getByIdAsync: jest.fn(),
    addAsync: jest.fn(),
    updateAsync: jest.fn(),
    deleteAsync: jest.fn(),
    getAllByIdAsync: jest.fn(),
    checkRoomAvailabilityAsync: jest.fn(),
  });
describe("Reservation service tests", () => {
  let mockReservationRepo: jest.Mocked<IReservationRepository>;
  let _logger: jest.Mocked<ILogger>;
  let reservationService: ReservationService;

  beforeEach(() => {
    mockReservationRepo = mockReservationRepository();

    _logger = {
      Info: jest.fn(),
      Error: jest.fn(),
    };
    reservationService = new ReservationService(mockReservationRepo, _logger);
  });

  describe("getAllReservation", () => {
    it("should return reservations dtos when success", async () => {
      // Arrange
      const mockReservations = [
        _reservationBuilder.buildWithName(),
        _reservationBuilder.buildWithName(),
      ];
      const mockResult = success(
        "Reservations retrieve successfully",
        mockReservations
      );

      mockReservationRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.getAllReservation();

      // Assert
      expect(mockReservationRepo.getAllAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data?.map((reservation) =>
          ReservationMapper.toReservationDto(
            reservation.reservation,
            reservation.clientName
          )
        ),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(
        mockReservations.map((reservation) =>
          ReservationMapper.toReservationDto(
            reservation.reservation,
            reservation.clientName
          )
        )
      );
      expect(result.message).toBe("Reservations retrieve successfully");
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockReservationRepo.getAllAsync.mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      const result = await reservationService.getAllReservation();

      // Assert
      expect(mockReservationRepo.getAllAsync).toHaveBeenCalledTimes(1);
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("getReservationByID", () => {
    it("should return Reservation dto when success", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder
        .withReservationId(reservationId)
        .buildWithName();
      const mockResult = success(
        "Reservation retrieve successfully",
        mockReservation
      );

      mockReservationRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.getReservationByID(reservationId);

      // Assert
      expect(mockReservationRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data:
          mockResult.data &&
          ReservationMapper.toReservationDto(
            mockResult.data.reservation,
            mockResult.data.clientName
          ),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("Reservation retrieve successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const reservationId = 1;
      const mockResult = failure<ReservationWithName>(
        `Reservation with id ${reservationId} not found`
      );

      mockReservationRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.getReservationByID(reservationId);

      // Assert
      expect(mockReservationRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Reservation with id ${reservationId} not found`
      );
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const reservationId = 1;
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockReservationRepo.getByIdAsync.mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      const result = await reservationService.getReservationByID(reservationId);

      // Assert
      expect(mockReservationRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("getAllByIdAsync", () => {
    it("should return all Reservations dtos when success", async () => {
      // Arrange
      const clientId = 1;
      const mockReservations = [
        _reservationBuilder.withClientId(clientId).buildWithName(),
        _reservationBuilder.withClientId(clientId).buildWithName(),
      ];
      const mockResult = success(
        `All Reservation from the client ${mockReservations[0].clientName} retrieved successfully`,
        mockReservations
      );

      mockReservationRepo.getAllByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.getAllReservationByID(clientId);

      // Assert
      expect(mockReservationRepo.getAllByIdAsync).toHaveBeenCalledTimes(1);
      expect(result.data).toEqual(
        mockReservations.map((reservation) =>
          ReservationMapper.toReservationDto(
            reservation.reservation,
            reservation.clientName
          )
        )
      );
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe(
        `All Reservation from the client ${mockReservations[0].clientName} retrieved successfully`
      );
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const clientId = 1;
      const mockResult = failure<ReservationWithName[]>(
        `Reservations from client Joe Doe not found`
      );

      mockReservationRepo.getAllByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.getAllReservationByID(clientId);

      // Assert
      expect(mockReservationRepo.getAllByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Reservations from client Joe Doe not found`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const clientId = 1;
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockReservationRepo.getAllByIdAsync.mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      const result = await reservationService.getAllReservationByID(clientId);

      // Assert
      expect(mockReservationRepo.getAllByIdAsync).toHaveBeenCalledTimes(1);
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("AddReservation", () => {
    it("should return Reservation dto when success", async () => {
      // Arrange
      const mockReservation = _reservationBuilder.build();
      const mockReservationWithName = _reservationBuilder.buildWithName();
      const mockResult = success(
        "Reservation added successfully",
        mockReservationWithName
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        success("", true)
      );

      mockReservationRepo.addAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.AddReservation(mockReservation);

      // Assert
      expect(mockReservationRepo.addAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data:
          mockResult.data &&
          ReservationMapper.toReservationDto(
            mockResult.data.reservation,
            mockResult.data.clientName
          ),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("Reservation added successfully");
    });

    it("should return failure when startDate or endDate is in the past", async () => {
      // Arrange
      const mockReservation = _reservationBuilder
        .withStartDate(new Date("2015-07-01"))
        .withEndDate(new Date("2015-07-01"))
        .build();

      const mockResult = failure<ReservationWithName>(
        `The reservation cannot be in the past`
      );

      // Act
      const result = await reservationService.AddReservation(mockReservation);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`The reservation cannot be in the past`);
    });

    it("should return failure when room is not available", async () => {
      // Arrange
      const mockReservation = _reservationBuilder.build();
      const mockResult = failure<false>(
        "The room is not available for the selected days"
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        mockResult
      );

      // Act
      const result = await reservationService.AddReservation(mockReservation);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "The room is not available for the selected days"
      );
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const mockReservation = _reservationBuilder.build();
      const mockResult = failure<ReservationWithName>(
        `Something went wrong: Repository error`
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        success("", true)
      );

      mockReservationRepo.addAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.AddReservation(mockReservation);

      // Assert
      expect(mockReservationRepo.addAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Something went wrong: Repository error`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const mockReservation = _reservationBuilder.build();
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        success("", true)
      );

      mockReservationRepo.addAsync.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await reservationService.AddReservation(mockReservation);

      // Assert
      expect(mockReservationRepo.addAsync).toHaveBeenCalledTimes(1);
      expect(mockReservationRepo.addAsync).toHaveBeenCalledWith(
        mockReservation
      );
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("updateReservation", () => {
    it("should return Reservation dto when success", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder
        .withReservationId(reservationId)
        .build();
      const mockReservationWithName = _reservationBuilder.buildWithName();
      const mockResult = success(
        "Reservation updated successfully",
        mockReservationWithName
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        success("", true)
      );

      mockReservationRepo.updateAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.updateReservation(
        reservationId,
        mockReservation
      );

      // Assert
      expect(mockReservationRepo.updateAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data:
          mockResult.data &&
          ReservationMapper.toReservationDto(
            mockResult.data.reservation,
            mockResult.data.clientName
          ),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("Reservation updated successfully");
    });

    it("should return failure when startDate or endDate is in the past", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder
        .withStartDate(new Date("2015-07-01"))
        .withEndDate(new Date("2015-07-01"))
        .build();

      const mockResult = failure<ReservationWithName>(
        `The reservation cannot be in the past`
      );

      // Act
      const result = await reservationService.updateReservation(
        reservationId,
        mockReservation
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`The reservation cannot be in the past`);
    });

    it("should return failure when room is not available", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder.build();
      const mockResult = failure<false>(
        "The room is not available for the selected days"
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        mockResult
      );

      // Act
      const result = await reservationService.updateReservation(
        reservationId,
        mockReservation
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "The room is not available for the selected days"
      );
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder.build();
      const mockResult = failure<ReservationWithName>(
        `Something went wrong: Repository error`
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        success("", true)
      );

      mockReservationRepo.updateAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.updateReservation(
        reservationId,
        mockReservation
      );

      // Assert
      expect(mockReservationRepo.updateAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Something went wrong: Repository error`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder.build();
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        success("", true)
      );

      mockReservationRepo.updateAsync.mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      const result = await reservationService.updateReservation(
        reservationId,
        mockReservation
      );

      // Assert
      expect(mockReservationRepo.updateAsync).toHaveBeenCalledTimes(1);
      expect(mockReservationRepo.updateAsync).toHaveBeenCalledWith(
        reservationId,
        mockReservation
      );
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("deleteReservation", () => {
    it("should return Reservation dto when success", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservationWithName = _reservationBuilder.buildWithName();
      const mockResult = success(
        "Reservation updated successfully",
        mockReservationWithName
      );

      mockReservationRepo.deleteAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.deleteReservation(reservationId);

      // Assert
      expect(mockReservationRepo.deleteAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data:
          mockResult.data &&
          ReservationMapper.toReservationDto(
            mockResult.data.reservation,
            mockResult.data.clientName
          ),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("Reservation updated successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const reservationId = 1;
      const mockResult = failure<ReservationWithName>(
        `Something went wrong: Repository error`
      );

      mockReservationRepo.deleteAsync.mockResolvedValue(mockResult);

      // Act
      const result = await reservationService.deleteReservation(reservationId);

      // Assert
      expect(mockReservationRepo.deleteAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Something went wrong: Repository error`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const reservationId = 1;
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockReservationRepo.deleteAsync.mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      const result = await reservationService.deleteReservation(reservationId);

      // Assert
      expect(mockReservationRepo.deleteAsync).toHaveBeenCalledTimes(1);
      expect(mockReservationRepo.deleteAsync).toHaveBeenCalledWith(
        reservationId
      );
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("CheckRoomAvailability", () => {
    it("should return true when success", async () => {
      // Arrange
      const mockRoomId = 1;
      const mockStartDate = new Date("2026-07-01");
      const mockEndDate = new Date("2026-07-04");
      const mockResult = success(
        "The room is available for reservation.",
        true
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        mockResult
      );
      // Act
      const result = await reservationService.CheckRoomAvailability(
        mockRoomId,
        mockStartDate,
        mockEndDate
      );

      // Assert
      expect(
        mockReservationRepo.checkRoomAvailabilityAsync
      ).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.isSuccess && true,
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("The room is available for reservation.");
    });

    it("should return failure when room is not available", async () => {
      // Arrange
      const mockRoomId = 1;
      const mockStartDate = new Date("2026-07-01");
      const mockEndDate = new Date("2026-07-04");
      const mockResult = failure<false>(
        "The room is not available for the selected days"
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        mockResult
      );

      // Act
      const result = await reservationService.CheckRoomAvailability(
        mockRoomId,
        mockStartDate,
        mockEndDate
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "The room is not available for the selected days"
      );
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const mockRoomId = 1;
      const mockStartDate = new Date("2026-07-01");
      const mockEndDate = new Date("2026-07-04");
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockReservationRepo.checkRoomAvailabilityAsync.mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      const result = await reservationService.CheckRoomAvailability(
        mockRoomId,
        mockStartDate,
        mockEndDate
      );

      // Assert
      expect(
        mockReservationRepo.checkRoomAvailabilityAsync
      ).toHaveBeenCalledTimes(1);
      expect(
        mockReservationRepo.checkRoomAvailabilityAsync
      ).toHaveBeenCalledWith(mockRoomId, mockStartDate, mockEndDate);
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });
});
