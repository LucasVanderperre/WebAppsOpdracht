import { Injectable } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Review } from './review.model';
import { Http, Response, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewDataService {
  private _appUrl = '/API/reviews';
  private _reviews;

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  get reviews(): Observable<Review[]> {
    return this.http.get(`${this._appUrl}/`,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response =>
        response.json().map(item => Review.fromJSON(item)));
  }

  getReview(id): Observable<Review> {
    return this.http.get(`${this._appUrl}/${id}`)
      .map(response => response.json()).map(item => Review.fromJSON(item));
  }

  get mostPositiveReviews(): Observable<Review[]> {
    return this.http.get(`${this._appUrl}/mostpositive`,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response =>
        response.json().map(item => Review.fromJSON(item)));
  }

  get mostNegativeReviews(): Observable<Review[]> {
    return this.http.get(`${this._appUrl}/mostnegative`,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response =>
        response.json().map(item => Review.fromJSON(item)));
  }
  get mostRecentReviews(): Observable<Review[]> {
    return this.http.get(`${this._appUrl}/mostrecent`,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response =>
        response.json().map(item => Review.fromJSON(item)));
  }
  

  getReviewsUser(): Observable<Review[]> {
    let userId;
    this.auth.user$.subscribe(item => userId = item);

    return this.http.get(`${this._appUrl}/user/${userId}`,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response => response.json().map(item => Review.fromJSON(item)));
  }



  addNewReview(rev:any): Observable<Review> {
    let userId;
    this.auth.user$.subscribe(item => userId = item);
    if(rev.username !== "Anoniem"){
      rev.username = userId
    }
    return this.http.post(`${this._appUrl}/${userId}/review`, rev,
     { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
      .map(res => res.json()).map(item => Review.fromJSON(item));
  }





  dislikeReview(id): Observable<Review>{
    let userId;
    this.auth.user$.subscribe(item => userId = item);
    return this.http.put(`${this._appUrl}/dislike/${id}/${userId}`,"",
    { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    .map(response => response.json()).map(item => Review.fromJSON(item));
  }

  likeReview(id): Observable<Review>{
    let userId;
    this.auth.user$.subscribe(item => userId = item);
    return this.http.put(`${this._appUrl}/like/${id}/${userId}`,"",
    { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
    .map(response => response.json()).map(item => Review.fromJSON(item));
  }

  removeReview(rec) {
    let userId;
    this.auth.user$.subscribe(item => userId = item);
    return this.http.delete(`${this._appUrl}/${userId}/${rec.id}`).map(res => res.json()).map(item => Review.fromJSON(item));
  }
  /*  get reservations(): Reservation[] {
      return this._reservations;
    }

    addNewReservation(reservation) {
      this._reservations.push(reservation);
    }*/
}
