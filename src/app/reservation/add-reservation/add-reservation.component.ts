import { Component, Output, EventEmitter } from '@angular/core';
import { Reservation } from '../reservation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationDataService } from '../reservation-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent {
  @Output() public newReservation = new EventEmitter<Reservation>();
  public reservation: FormGroup;
  public reservationR:Reservation;

  constructor(private fb: FormBuilder, private _reservationDataService: ReservationDataService, private _router: Router) { }

  ngOnInit() {
    this.reservation = this.fb.group({
      message: [""],
      amount: Number,
      time:null
    });
  }

  onSubmit() {
    const reservation = new Reservation(this.reservation.value.amount);
    reservation.message = this.reservation.value.message;
    reservation.time = this.reservation.value.time;
    this._reservationDataService.addNewReservation(reservation).subscribe(review=>this.reservationR=review);
    this.reservation = this.fb.group({
      message: [""],
      amount: Number,
      time : null
    });
    location.reload();
    
  }  

}

