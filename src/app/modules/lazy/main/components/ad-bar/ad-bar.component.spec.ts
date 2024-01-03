import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBarComponent } from './ad-bar.component';

describe('AdBarComponent', () => {
  let component: AdBarComponent;
  let fixture: ComponentFixture<AdBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdBarComponent]
    });
    fixture = TestBed.createComponent(AdBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
