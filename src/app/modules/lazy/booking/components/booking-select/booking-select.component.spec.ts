import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSelectComponent } from './booking-select.component';

describe('BookingSelectComponent', () => {
  let component: BookingSelectComponent;
  let fixture: ComponentFixture<BookingSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingSelectComponent]
    });
    fixture = TestBed.createComponent(BookingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
