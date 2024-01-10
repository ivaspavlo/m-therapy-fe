import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobileMenuComponent } from './header-mobile-menu.component';

describe('HeaderMobileMenuComponent', () => {
  let component: HeaderMobileMenuComponent;
  let fixture: ComponentFixture<HeaderMobileMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMobileMenuComponent]
    });
    fixture = TestBed.createComponent(HeaderMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
