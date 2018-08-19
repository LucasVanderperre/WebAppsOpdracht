import { TestBed, inject } from '@angular/core/testing';

import { HttpModule} from '@angular/http';
import { ReviewDataService } from './review-data.service';
import { AuthenticationService } from '../user/authentication.service';


describe('ReviewDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ReviewDataService , AuthenticationService]
    });
  });

  it('should be created', inject([ReviewDataService], (service: ReviewDataService) => {
    expect(service).toBeTruthy();
  }));
});
