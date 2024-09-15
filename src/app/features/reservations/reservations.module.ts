import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    ReservationsComponent,
    ReactiveFormsModule 
  ],
  declarations:[
    AddReservationComponent,
    EditReservationComponent,
    ReservationFormComponent 
  ],
  exports: [ReservationsComponent]
})
export class ReservationsModule { }
