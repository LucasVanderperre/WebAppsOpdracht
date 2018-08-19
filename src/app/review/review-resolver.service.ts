import { ReviewDataService } from './review-data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Review } from './review.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ReviewResolver implements Resolve< Review > {
    constructor(private reviewService: ReviewDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Review> {
        return this.reviewService.getReview(route.params['id']);
    }
}
