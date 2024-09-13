import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './reservations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush, // Utilisation de la stratégie OnPush
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = [...data];
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations', err);
      }
    });
  }

  protected confirmDelete(): void {
    // Implémenter la logique pour afficher un modal de confirmation avant suppression
  }
}
