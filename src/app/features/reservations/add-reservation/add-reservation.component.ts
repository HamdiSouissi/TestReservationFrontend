import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
})
export class AddReservationComponent {
  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  onSubmit(reservation: Reservation): void {
    this.reservationService.createReservation(reservation).subscribe(() => {
      this.router.navigate(['/reservations']);
    });
  }
}
