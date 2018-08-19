import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../user/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AddReviewComponent } from './add-review.component';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddReviewComponent', () => {
  let component: AddReviewComponent;
  let fixture: ComponentFixture<AddReviewComponent>;
  let DebugElement : DebugElement;
  let htmlElement : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReviewComponent ],
      imports: [ReactiveFormsModule, HttpModule, RouterTestingModule],
      providers: [AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    DebugElement = fixture.debugElement.query(By.css('#username'));
    htmlElement = DebugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
