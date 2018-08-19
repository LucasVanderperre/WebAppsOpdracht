import { Review } from '../review.model';
import { ReviewDataService } from './../review-data.service';
import { AuthenticationService } from '../../user/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
  providers: [ ReviewDataService ]

})
export class AddReviewComponent implements OnInit {
  @Output() public newReview = new EventEmitter<Review>();
  public review: FormGroup;
  public reviewR:Review;

  constructor(private fb: FormBuilder, private _reviewDataService: ReviewDataService, private _router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.review = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(5)]],
      ano: false
    });
  }

  onSubmit() {
    const review = new Review(this.review.value.beschrijving);
    if(this.review.value.ano){
      review.username = "Anoniem";
    }
    this._reviewDataService.addNewReview(review).subscribe(review=>this.reviewR=review);
    this.review = this.fb.group({
      beschrijving: [""],
      ano: false
    });
  }  

}
