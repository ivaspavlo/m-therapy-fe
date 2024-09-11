import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBookingDialogComponent } from './pre-booking-dialog.component';

describe('PreBookingDialogComponent', () => {
  let component: PreBookingDialogComponent;
  let fixture: ComponentFixture<PreBookingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreBookingDialogComponent]
    });
    fixture = TestBed.createComponent(PreBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
