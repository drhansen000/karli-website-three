import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsModalComponent } from './appointments-modal.component';

describe('AppointmentsModalComponent', () => {
  let component: AppointmentsModalComponent;
  let fixture: ComponentFixture<AppointmentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
