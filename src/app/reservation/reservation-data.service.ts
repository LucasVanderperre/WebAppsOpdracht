import { Injectable } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Reservation } from './reservation.model';
import { Http, Response, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ReservationDataService {
  private _appUrl = '/API/reservations';
  private _reservations;

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  get reservations(): Observable<Reservation[]> {
    /* return this.http.get(`${this._appUrl}`, 
     { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
     .map(response => response.json().map(item => Reservation.fromJSON(item)));
 */
    let userId;
    this.auth.user$.subscribe(item => userId = item);

    return this.http.get(`${this._appUrl}/user/${userId}`,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response => response.json().map(item => Reservation.fromJSON(item)));
  }

  removeReservation(res): Observable<Reservation> {
    console.log(`${this._appUrl}/${res.id}`);
    return this.http.delete(`${this._appUrl}/${res.id}`,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response => response.json().map(item => Reservation.fromJSON(item)));
  }


  addNewReservation(res): Observable<Reservation> {
    let userId;
    this.auth.user$.subscribe(item => userId = item);

    return this.http.post(`${this._appUrl}/${userId}/reservation`, res,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(rez => rez.json()).map(item => Reservation.fromJSON(item));
  }


  getReservation(id): Observable<Reservation> {
    return this.http.get(`${this._appUrl}/reservation/${id}`)
      .map(response => response.json()).map(item => Reservation.fromJSON(item));
  }




  /*  get reservations(): Reservation[] {
      return this._reservations;
    }

    addNewReservation(reservation) {
      this._reservations.push(reservation);
    }*/
}
