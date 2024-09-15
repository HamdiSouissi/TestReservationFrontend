import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReservationsComponent } from './add-reservations.component'; 

const routes: Routes = [{ path: '', component: AddReservationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddReservationsRoutingModule { }
