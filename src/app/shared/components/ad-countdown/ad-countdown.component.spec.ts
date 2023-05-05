import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCountdownComponent } from './ad-countdown.component';

describe('AdCountdownComponent', () => {
  let component: AdCountdownComponent;
  let fixture: ComponentFixture<AdCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdCountdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
