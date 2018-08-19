import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ReservationDataService } from '../reservation-data.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @Input() public reservation: Reservation;
  @Output() public deleteReservation = new EventEmitter<Reservation>();


  constructor(private _reservationDataService: ReservationDataService) {
  }
  ngOnInit() {
  }
  removereservation() {
    console.log(this.reservation.id);
    this.deleteReservation.emit(this.reservation);
    location.reload();
  }
}
