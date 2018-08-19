import { ReservationDataService } from './reservation-data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Reservation } from './reservation.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ReservationResolver implements Resolve< Reservation > {
    constructor(private recipeService: ReservationDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reservation> {
        return this.recipeService.getReservation(route.params['id']);
    }
}
