import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    {
      path: '', loadChildren: () => import('src/app/features/home/home.module').then(m => m.HomeModule),
    },
    {
      path: 'home', loadChildren: () => import('src/app/features/home/home.module').then(m => m.HomeModule),
    },
    {
      path: 'reservations', loadChildren: () => import('src/app/features/reservations/reservations-list/reservations.module').then(m => m.ReservationsModule),
    },
    {
      path: 'add-reservations', loadChildren: () => import('src/app/features/reservations/add-reservations/add-reservations.module').then(m => m.AddReservationsModule),
    }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
