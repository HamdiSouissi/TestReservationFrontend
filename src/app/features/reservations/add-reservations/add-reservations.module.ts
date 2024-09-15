import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReservationsRoutingModule } from './add-reservations-routing.module'; 
import { AddReservationsComponent } from './add-reservations.component';


@NgModule({
  imports: [
    CommonModule,
    AddReservationsRoutingModule,
    AddReservationsComponent,
  ],
  exports: [AddReservationsComponent]
})
export class AddReservationsModule { }
