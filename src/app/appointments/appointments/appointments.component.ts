import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getIsMobile(): boolean {
    console.log(window.innerWidth);
    return window.innerWidth < 800;
  }
}
