import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowAnimatedButtonComponent } from './arrow-animated-button.component';

describe('ArrowAnimatedButtonComponent', () => {
  let component: ArrowAnimatedButtonComponent;
  let fixture: ComponentFixture<ArrowAnimatedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowAnimatedButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowAnimatedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
