import { ReservationServiceService } from "@application/services/ReservationModule/reservationService.service";
import { Logger } from "@infrastructure/logger/logger";
import { ReservationServiceRepository } from "@infrastructure/repositories/ReservationModule/reservationService.repository";

class ReservationServiceContainer {
  private static logger = new Logger();
  private static reservationServiceRepository =
    new ReservationServiceRepository(ReservationServiceContainer.logger);

  static getReservationServiceRepository() {
    return this.reservationServiceRepository;
  }

  static getReservationServiceService() {
    return new ReservationServiceService(
      this.getReservationServiceRepository(),
      this.logger
    );
  }
}

export { ReservationServiceContainer };
