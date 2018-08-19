import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Review } from '../review.model';
import { ReviewDataService } from '../review-data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() public review: Review;
  @Output() public deleteReview = new EventEmitter<Review>();

  constructor(private _reviewDataService: ReviewDataService) {
  }
  ngOnInit() {
  }
  removeReview() {
    this.deleteReview.emit(this.review);
  }

  dislike(){
    this._reviewDataService.dislikeReview(this.review.id).subscribe(review => this.review = review);
  }
  like(){
    this._reviewDataService.likeReview(this.review.id).subscribe(review => this.review = review);

  }


}
