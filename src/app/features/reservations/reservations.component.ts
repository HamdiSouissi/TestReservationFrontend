import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule 
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
        console.log(this.reservations);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations', err);
      }
    });
  }

  protected confirmDelete(reservationId:number): void {
    // Implémenter la logique pour afficher un modal de confirmation avant suppression
  }

  formatTimeFromDate(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}h${minutes}`;
  }
}
