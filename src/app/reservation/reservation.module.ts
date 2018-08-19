import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReservationDataService } from './reservation-data.service';
import { ReservationComponent } from './reservation/reservation.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationResolver } from './reservation-resolver.service';

const routes = [
  { path: 'list', component: ReservationListComponent },
  { path: 'add', component: AddReservationComponent },
  { path: ':id', component: ReservationDetailComponent,
    resolve: { recipe: ReservationResolver} }
];

@NgModule({
  declarations: [
    ReservationComponent,
    AddReservationComponent,
    ReservationListComponent,
    ReservationDetailComponent
  ],
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ReservationDataService,
    ReservationResolver
  ],
})
export class ReservationModule { }
