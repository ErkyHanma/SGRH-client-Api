import { IReservationRepository } from "@domain/interfaces/ReservationModuleTypes";
import { ReservationBuilder } from "./EntityBuilder/reservation.builder";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { failure, success } from "@domain/entities/Base/OperationResult";
import { ReservationWithName } from "@infrastructure/repositories/ReservationModule/reservation.repository";

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

describe("ReservationRepository Tests", () => {
  let mockReservationRepo: jest.Mocked<IReservationRepository>;

  beforeEach(() => {
    mockReservationRepo = mockReservationRepository();
  });

  describe("getAllAsync", () => {
    it("should return all reservation", async () => {
      // Arrange
      const mockReservations: ReservationWithName[] = [
        _reservationBuilder.buildWithName(),
        _reservationBuilder.buildWithName(),
      ];
      const mockResult = success(
        "Reservations retrieved successfully",
        mockReservations
      );

      mockReservationRepo.getAllAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.getAllAsync();

      // Assert
      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockReservations);
      expect(result.message).toBe("Reservations retrieved successfully");
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange

      const mockResult = failure<ReservationWithName[]>(
        "Something went wrong: Database connection failed"
      );

      mockReservationRepo.getAllAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.getAllAsync();

      // Assert
      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "Something went wrong: Database connection failed"
      );
    });
  });

  describe("getByIdAsync", () => {
    it("should return reservation when reservation found", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder
        .withReservationId(reservationId)
        .buildWithName();

      const mockResult = success(
        `Reservation ${mockReservation.reservation.reservationId} retrieved successfully`,
        mockReservation
      );

      mockReservationRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockReservationRepo.getByIdAsync(reservationId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockReservation);
      expect(result.message).toBe(
        `Reservation ${mockReservation.reservation.reservationId} retrieved successfully`
      );
    });

    it("should return failure when reservation not found", async () => {
      // Arrange
      const reservationId = 1;

      const mockResult = failure<ReservationWithName>(
        `Reservation with id ${reservationId} not found`
      );

      mockReservationRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockReservationRepo.getByIdAsync(reservationId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Reservation with id ${reservationId} not found`
      );
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const reservationId = 1;
      const mockResult = failure<ReservationWithName>(
        `Something went wrong: Database connection failed`
      );

      mockReservationRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockReservationRepo.getByIdAsync(reservationId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("getAllByIdAsync", () => {
    it("should return reservations when client found", async () => {
      // Arrange
      const clientId = 1;
      const mockReservation: ReservationWithName[] = [
        _reservationBuilder.withClientId(clientId).buildWithName(),
        _reservationBuilder.withClientId(clientId).buildWithName(),
      ];

      const mockResult = success(
        `All Reservation from the client ${mockReservation[0].clientName} retrieved successfully`,
        mockReservation
      );

      mockReservationRepo.getAllByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockReservationRepo.getAllByIdAsync(clientId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockReservation);
      expect(result.message).toBe(
        `All Reservation from the client ${mockReservation[0].clientName} retrieved successfully`
      );
    });

    it("should return failure when client not found", async () => {
      // Arrange
      const clientId = 1;
      const mockResult = failure<ReservationWithName[]>(
        `Reservations from client Joe Doe not found`
      );

      mockReservationRepo.getAllByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockReservationRepo.getAllByIdAsync(clientId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Reservations from client Joe Doe not found`);
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const clientId = 1;
      const mockResult = failure<ReservationWithName[]>(
        `Something went wrong: Database connection failed`
      );

      mockReservationRepo.getAllByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockReservationRepo.getAllByIdAsync(clientId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("addAsync", () => {
    it("should return reservation when success", async () => {
      // Arrange
      const mockReservation = _reservationBuilder.build();
      const mockReservationWithName = _reservationBuilder.buildWithName();

      const mockResult = success(
        `Reservation added successfully`,
        mockReservationWithName
      );

      mockReservationRepo.addAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.addAsync(mockReservation);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockReservationWithName);
      expect(result.message).toBe("Reservation added successfully");
    });

    it("should return failure when reservation could not be added", async () => {
      // Arrange
      const mockReservation = _reservationBuilder.build();
      const mockResult = failure<ReservationWithName>(
        `Failed to insert reservation`
      );

      mockReservationRepo.addAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.addAsync(mockReservation);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Failed to insert reservation`);
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const mockReservation = _reservationBuilder.build();
      const mockResult = failure<ReservationWithName>(
        `Something went wrong: Database connection failed`
      );

      mockReservationRepo.addAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.addAsync(mockReservation);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("updateAsync", () => {
    it("should return reservation when success", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder
        .withReservationId(reservationId)
        .build();
      const mockReservationWithName = _reservationBuilder
        .withReservationId(reservationId)
        .buildWithName();
      const mockResult = success(
        `Reservation updated successfully`,
        mockReservationWithName
      );

      mockReservationRepo.updateAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.updateAsync(
        reservationId,
        mockReservation
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockReservationWithName);
      expect(result.message).toBe("Reservation updated successfully");
    });

    it("should return failure when reservation not found", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder
        .withReservationId(reservationId)
        .build();
      const mockResult = failure<ReservationWithName>(
        `Reservation with id ${reservationId} not found`
      );

      mockReservationRepo.updateAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.updateAsync(
        reservationId,
        mockReservation
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Reservation with id ${reservationId} not found`
      );
    });

    it("should return failure when reservation not updated", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder
        .withReservationId(reservationId)
        .build();
      const mockResult = failure<ReservationWithName>(
        `Failed to update reservation`
      );

      mockReservationRepo.updateAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.updateAsync(
        reservationId,
        mockReservation
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Failed to update reservation`);
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservation = _reservationBuilder
        .withReservationId(reservationId)
        .build();
      const mockResult = failure<ReservationWithName>(
        `Something went wrong: Database connection failed`
      );

      mockReservationRepo.updateAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.updateAsync(
        reservationId,
        mockReservation
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("deleteAsync", () => {
    it("should return ReservationWithName when success", async () => {
      // Arrange
      const reservationId = 1;
      const mockReservationWithName = _reservationBuilder
        .withReservationId(reservationId)
        .buildWithName();
      const mockResult = success(
        `Reservation deleted successfully`,
        mockReservationWithName
      );

      mockReservationRepo.deleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.deleteAsync(reservationId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockReservationWithName);
      expect(result.message).toBe("Reservation deleted successfully");
    });

    it("should return failure when reservation not found", async () => {
      // Arrange
      const reservationId = 1;
      const mockResult = failure<ReservationWithName>(
        `Reservation with id ${reservationId} not found`
      );

      mockReservationRepo.deleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.deleteAsync(reservationId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Reservation with id ${reservationId} not found`
      );
    });

    it("should return failure when reservation not deleted", async () => {
      // Arrange
      const reservationId = 1;
      const mockResult = failure<ReservationWithName>(
        `Reservation with id ${reservationId} could not be deleted`
      );

      mockReservationRepo.deleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.deleteAsync(reservationId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Reservation with id ${reservationId} could not be deleted`
      );
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const reservationId = 1;
      const mockResult = failure<ReservationWithName>(
        `Something went wrong: Database connection failed`
      );

      mockReservationRepo.deleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockReservationRepo.deleteAsync(reservationId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("checkRoomAvailabilityAsync", () => {
    it("should return boolean when success", async () => {
      // Arrange
      const mockRoomId = 1;
      const mockStartDate = new Date("2025-07-01");
      const mockEndDate = new Date("2025-07-04");

      const mockResult = success(
        "The room is available for reservation.",
        true
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        mockResult
      );

      // Act
      const result = await mockReservationRepo.checkRoomAvailabilityAsync(
        mockRoomId,
        mockStartDate,
        mockEndDate
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(true);
      expect(result.message).toBe("The room is available for reservation.");
    });

    it("should return failure when room is not available", async () => {
      // Arrange
      const mockRoomId = 1;
      const mockStartDate = new Date("2025-07-01");
      const mockEndDate = new Date("2025-07-04");

      const mockResult = failure<false>(
        "The room is already reserved for the selected dates."
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        mockResult
      );

      // Act
      const result = await mockReservationRepo.checkRoomAvailabilityAsync(
        mockRoomId,
        mockStartDate,
        mockEndDate
      );

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "The room is already reserved for the selected dates."
      );
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const mockRoomId = 1;
      const mockStartDate = new Date("2025-07-01");
      const mockEndDate = new Date("2025-07-04");
      const mockResult = failure<boolean>(
        `Something went wrong: Database connection failed`
      );

      mockReservationRepo.checkRoomAvailabilityAsync.mockResolvedValue(
        mockResult
      );
      // Act
      const result = await mockReservationRepo.checkRoomAvailabilityAsync(
        mockRoomId,
        mockStartDate,
        mockEndDate
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
