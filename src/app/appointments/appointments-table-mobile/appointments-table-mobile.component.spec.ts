import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsTableMobileComponent } from './appointments-table-mobile.component';

describe('AppointmentsTableMobileComponent', () => {
  let component: AppointmentsTableMobileComponent;
  let fixture: ComponentFixture<AppointmentsTableMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsTableMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsTableMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
