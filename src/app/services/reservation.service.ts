import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from '../shared/models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir toutes les réservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((apiReservations: any[]) => {
        return apiReservations.map(apiReservation => this.transformReservation(apiReservation));
      })
    );
  }

  // Méthode pour obtenir une seule réservation par ID
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour créer une nouvelle réservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<any>(this.apiUrl, reservation).pipe(
      map(apiReservation => this.transformReservation(apiReservation))
    );
  }

  // Méthode pour modifier une réservation existante
  updateReservation(id: number, reservation: Partial<Reservation>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, reservation);
  }

  // Méthode pour supprimer une réservation
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private transformReservation(apiReservation: any): Reservation {
    return {
      id: apiReservation.id,
      travelDate: apiReservation.travelDate,
      client: {
        id: apiReservation.client.id,
        nom: apiReservation.client.name,
        email: apiReservation.client.email,
      },
      trajets: [
        {
          id: apiReservation.bus.id,
          nbrPlaces: apiReservation.bus.seats,
          dateDepart: new Date(apiReservation.travelDate),
          bus: {
            id: apiReservation.bus.id,
            numero: apiReservation.bus.busNumber,
          },
          price: apiReservation.bus.price,
        },
      ],
    };
  }
}
