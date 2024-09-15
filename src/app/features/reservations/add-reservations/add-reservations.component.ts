import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { BusService } from 'src/app/shared/services/bus.service';
import { Bus } from 'src/app/shared/models/bus.model';
import { Subject, takeUntil } from 'rxjs';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-add-reservations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-reservations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReservationsComponent implements OnInit, OnDestroy {

  reservationForm!: FormGroup;
  buses: Bus[] = [];
  destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder, 
    private busService: BusService, 
    private reservationService: ReservationService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.busService.getAllBuses().pipe(takeUntil(this.destroy$))
      .subscribe(buses => {
        this.buses = buses;
    });
  }

  initForm() {
    this.reservationForm = this.fb.group({
      client: this.fb.group({
        id: [1],
        name: [{value: 'userTest', disabled: true}, Validators.required],
        email: [{value: 'test@gmail.com', disabled: true}, [Validators.required, Validators.email]],
      }),
      trajets: this.fb.array([])
    });
  }

  get trajets() {
    return this.reservationForm.get('trajets') as FormArray;
  }

  addTrajet() {
    this.trajets.push(this.fb.group({
      nbrPlaces: [0, Validators.required],
      departureTime: ['', Validators.required],
      unitTrajetPrice: [''],
      bus: this.fb.group({
        busNumber: [null, Validators.required],
        unitTrajetPrice: [0.0, Validators.required],
      })
    }));
  }

  deleteTrajet(index: number) {
    this.trajets.removeAt(index);
  }

  submit() {
    const reservation: Reservation = {
      ...this.reservationForm?.value
    };

    console.log('reservation to save:', this.reservationForm.value);
    if(this.reservationForm.value.trajets.length > 0 && this.reservationForm.valid) {
      this.createReservation(reservation);
    } else {
      this.snackbarService.showError();
    }
  }

  private createReservation(reservation : Reservation) {
    this.reservationService.createReservation(reservation)
        .pipe(takeUntil(this.destroy$))
          .subscribe( {
            next: () => {
              this.snackbarService.showSuccess();
              this.router.navigateByUrl('reservations');
            }
          });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
