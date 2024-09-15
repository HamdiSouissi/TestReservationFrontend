// src/app/features/reservations/edit-reservation/edit-reservation.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html'
})
export class EditReservationComponent implements OnInit {
  reservationId!: number;
  reservationData!: Reservation;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la réservation depuis l'URL
    this.reservationId = +this.route.snapshot.paramMap.get('id')!;
    
    // Récupérer les données de la réservation par ID
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (data: Reservation) => {
        this.reservationData = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la réservation', err);
      }
    });
  }

  onSubmit(updatedReservation: Reservation): void {
    // Envoyer la mise à jour via une requête PUT
    this.reservationService.updateReservation(this.reservationId, updatedReservation).subscribe({
      next: () => {
        console.log('Réservation mise à jour avec succès');
        this.router.navigate(['/reservations']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la réservation', err);
      }
    });
  }
}
