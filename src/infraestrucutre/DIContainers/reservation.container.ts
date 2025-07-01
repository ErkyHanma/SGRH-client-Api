import { ReservationService } from "@application/services/ReservationModule/reservation.service";
import { ReservationRepository } from "@infraestrucutre/repositories/ReservationModule/reservation.repository";

class ReservationContainer {
  private static reservationRepository = new ReservationRepository();

  static getReservationRepository() {
    return this.reservationRepository;
  }

  static getReservationService() {
    return new ReservationService(this.getReservationRepository());
  }
}

export { ReservationContainer };
