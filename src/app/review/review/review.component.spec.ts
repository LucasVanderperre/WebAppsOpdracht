import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReviewComponent } from './review.component';
import { By } from '@angular/platform-browser';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let DebugElement : DebugElement;
  let htmlElement : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    DebugElement = fixture.debugElement.query(By.css('#username'));
    htmlElement = DebugElement.nativeElement;
  });

  it('Verwachten de user in het il element gelijk is aan de username', () => {
    expect(htmlElement.textContent).toEqual(component.review.username);
  });
});
