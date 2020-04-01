import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit {
  // Create an appointment interface to ensure that the user input the information correctly
  constructor() { }

  ngOnInit(): void {
  }

}
