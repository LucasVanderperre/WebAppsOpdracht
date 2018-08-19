import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ReviewDataService } from './review-data.service';
import { ReviewComponent } from './review/review.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ReviewListComponent } from './review-list/review-list.component';
//import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReviewResolver } from './review-resolver.service';

const routes = [
  { path: 'list', component: ReviewListComponent },
  { path: 'add', component: AddReviewComponent },
  //{ path: ':id', component: ReservationDetailComponent,
  //  resolve: { recipe: ReservationResolver} }
];

@NgModule({
  declarations: [
    ReviewComponent,
    AddReviewComponent,
    ReviewListComponent
    //ReservationDetailComponent
  ],
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
      NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ReviewDataService,
    ReviewResolver
  ],
})
export class ReviewModule { }
