import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesModalComponent } from './updates-modal.component';

describe('UpdatesModalComponent', () => {
  let component: UpdatesModalComponent;
  let fixture: ComponentFixture<UpdatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
