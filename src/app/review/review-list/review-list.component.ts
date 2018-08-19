import { Component, OnInit } from '@angular/core';
import { Review } from '../review.model';
import { ReviewDataService } from '../review-data.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  private _reviews: Review[];

  constructor(private _reviewDataService: ReviewDataService) {
  }

  ngOnInit() {
    this._reviewDataService.reviews.subscribe(items => this._reviews = items);
  }

  get reviews() {
    return this._reviews;
  }

  removeReview(review: Review) {
    this._reviewDataService.removeReview(review).subscribe(item =>
      this._reviews = this._reviews.filter(val => item.id !== val.id)
    );
  }

  mostPositiveReviews(){
    this._reviewDataService.mostPositiveReviews.subscribe(items => this._reviews = items);
  }
  
  mostNegativeReviews(){
    this._reviewDataService.mostNegativeReviews.subscribe(items => this._reviews = items);
  }
  mostRecentReviews(){
    this._reviewDataService.mostRecentReviews.subscribe(items => this._reviews = items);
  }

}
