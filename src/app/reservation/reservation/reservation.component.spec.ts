import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationComponent } from './reservation.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let DebugElement : DebugElement;
  let htmlElement : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Verwachten de amount gelijk is aan die van de reservatie', () => {
    DebugElement = fixture.debugElement.query(By.css('#amount'));
    htmlElement = DebugElement.nativeElement;
    expect(htmlElement.textContent).toEqual(""+component.reservation.amount);
  });

  it('Verwachten de amount gelijk is aan die van de reservatie', () => {
    DebugElement = fixture.debugElement.query(By.css('#date'));
    htmlElement = DebugElement.nativeElement;
    expect(htmlElement.textContent).toMatch(/\b(?:(?:Mon)|(?:Tues?)|(?:Wed(?:nes)?)|(?:Thur?s?)|(?:Fri)|(?:Sat(?:ur)?)|(?:Sun))(?:day)?\b[:\-,]?\s*[a-zA-Z]{3,9}\s+\d{1,2}\s*,?\s*\d{4}/);
    ;
  });

  it('Verwachten de message gelijk is aan die van de reservatie', () => {
    DebugElement = fixture.debugElement.query(By.css('#message'));
    htmlElement = DebugElement.nativeElement;
    expect(htmlElement.textContent).toEqual(component.reservation.message);
  });

});
