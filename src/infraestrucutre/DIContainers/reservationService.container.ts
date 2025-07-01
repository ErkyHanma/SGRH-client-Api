import { ReservationServiceService } from "@application/services/ReservationModule/reservationService.service";
import { ReservationServiceRepository } from "@infraestrucutre/repositories/ReservationModule/reservationService.repository";

class ReservationServiceContainer {
  private static reservationServiceRepository =
    new ReservationServiceRepository();

  static getReservationServiceRepository() {
    return this.reservationServiceRepository;
  }

  static getReservationServiceService() {
    return new ReservationServiceService(
      this.getReservationServiceRepository()
    );
  }
}

export { ReservationServiceContainer };
