import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTagComponent } from './title-tag.component';

describe('TitleTagComponent', () => {
  let component: TitleTagComponent;
  let fixture: ComponentFixture<TitleTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
