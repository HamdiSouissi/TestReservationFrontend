import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../shared/models/reservation.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  private mapReservation(apiResponse: any): Reservation {
    return {
      id: apiResponse.id,
      client: {
        id: apiResponse.client.id,
        nom: apiResponse.client.name,
        email: apiResponse.client.email,
      },
      trajets: [{
        id: apiResponse.bus.id,
        nbrPlaces: apiResponse.bus.seats,
        dateDepart: new Date(apiResponse.travelDate),
        price: apiResponse.bus.price,
        bus: {
          id: apiResponse.bus.id,
          numero: apiResponse.bus.busNumber,
        }
      }]
    };
  }

  // Méthode pour récupérer les réservations et mapper la réponse
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl).pipe(
      map((response: any[]) => response.map(this.mapReservation)) // Mapper chaque réservation
    );
  }


}
