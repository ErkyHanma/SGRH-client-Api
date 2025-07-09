import { ReservationService } from "@application/services/ReservationModule/reservation.service";
import { Logger } from "@infraestrucutre/logger/logger";
import { ReservationRepository } from "@infraestrucutre/repositories/ReservationModule/reservation.repository";

class ReservationContainer {
  private static logger = new Logger();
  private static reservationRepository = new ReservationRepository(
    ReservationContainer.logger
  );

  static getReservationRepository() {
    return this.reservationRepository;
  }

  static getReservationService() {
    return new ReservationService(this.getReservationRepository(), this.logger);
  }
}

export { ReservationContainer };
