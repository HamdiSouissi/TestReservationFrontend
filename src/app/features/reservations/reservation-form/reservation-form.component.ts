import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reservation } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html'
})
export class ReservationFormComponent implements OnInit {
  @Input() initialData: Reservation | null = null;
  @Output() formSubmit = new EventEmitter<Reservation>();
  
  reservationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      travelDate: [this.initialData?.travelDate || ''],
      client: [this.initialData?.client?.id || ''],
      trajets: this.fb.array(this.initialData?.trajets?.map(trajet => this.fb.group({
        nbrPlaces: [trajet.nbrPlaces],
        dateDepart: [trajet.dateDepart],
        bus: [trajet.bus.id]
      })) || [])
    });
  }

  onSubmit() {
    const updatedReservation: Reservation = {
      id: this.initialData ? this.initialData.id : 0,
      travelDate: this.reservationForm.value.travelDate,
      client: { id: this.reservationForm.value.client, nom: '', email: '' },  // Compléter avec des valeurs par défaut
      trajets: this.reservationForm.value.trajets.map((trajet: any) => ({
        ...trajet,
        bus: { id: trajet.bus }  // Envoyer uniquement l'ID du bus
      }))
    };
  
    this.formSubmit.emit(updatedReservation);
  }
}
