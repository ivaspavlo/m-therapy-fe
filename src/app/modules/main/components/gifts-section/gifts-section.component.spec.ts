import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsSectionComponent } from './gifts-section.component';

describe('GiftsSectionComponent', () => {
  let component: GiftsSectionComponent;
  let fixture: ComponentFixture<GiftsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
