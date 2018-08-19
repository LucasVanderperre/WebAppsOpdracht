import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ReservationDataService } from 'src/app/reservation/reservation-data.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  providers: [ReservationDataService]
})
export class ReservationListComponent implements OnInit {
  private _reservations: Reservation[];

  constructor(private _reservationDataService: ReservationDataService) {
  }

  ngOnInit() {
    this._reservationDataService.reservations.subscribe(items => this._reservations = items);
  }

  get reservations() {
    return this._reservations;
  }

  removeReservation(reservation: Reservation) {
    this._reservationDataService.removeReservation(reservation).subscribe(item =>
      this._reservations = this._reservations.filter(val => item.id !== val.id)
    );
  }
  
}
