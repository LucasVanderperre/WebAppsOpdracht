import { ReservationDataService } from './../reservation-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  private _reservation: Reservation;

  constructor(private route: ActivatedRoute, private reservationDataService: ReservationDataService) {
  }

  get recipe() {
    return this._reservation;
  }

  ngOnInit() {
    this.route.data.subscribe(item => 
      this._reservation = item['reservation']);
  }
}
