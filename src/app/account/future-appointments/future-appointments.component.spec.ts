import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureAppointmentsComponent } from './future-appointments.component';

describe('FutureAppointmentsComponent', () => {
  let component: FutureAppointmentsComponent;
  let fixture: ComponentFixture<FutureAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
