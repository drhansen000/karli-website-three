import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppointmentsModalComponent } from '../appointments-modal/appointments-modal.component';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit, OnChanges {
  @Input() startDate: number;
  days: Array<object>;
  readonly hours: Array<number> = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  readonly MILLISECONDS_IN_HOUR: number;
  readonly TODAY: number;

  constructor(private matDialog: MatDialog) {
    this.MILLISECONDS_IN_HOUR = 3600000;
    this.TODAY = new Date().getTime();
  }

  /*
    NG ON CHANGES
    Set all of the variables reliant upon the data being passed from the parent component.
    1. Set the current week's Monday to start the table display by:
      a. Getting the current date
      b. Getting the offset(currentDate.day - 1[because we're starting on Monday which is 1])
      c. Subtracting the offset from the current date
    2. Create a Day object by:
      a. Creating a string for the day's column header
      b. Storing the day's date as milliseconds
    3. Store the Day into the days array
    4. Get the next day
    5. Repeat steps 2-4 until we've reached the end of the daysRef array(Saturday)

    This method fires every time the @Input variables change
  */
  ngOnChanges(): void {
    this.days = [];
    const daysRef = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const MILLISECONDS_IN_DAY =  86400000;
    let dateIterator = this.startDate;
    for (const dayRef of daysRef) {
      this.days.push({
        formattedDate: `${dayRef} ${this.formatHeaderDate(dateIterator)}`,
        date: dateIterator
      });
      dateIterator += MILLISECONDS_IN_DAY;
    }
  }

  ngOnInit() {}

  /*
    FORMAT HEADER DATE
    Create a header for each day column
      1. Convert the day's date from milliseconds into a Date
      2. Convert the Date object into a string of MM/DD
      3. Return the string
  */
  private formatHeaderDate(date: number): string {
    const formatDate = new Date(date);
    let formattedDate: string = (formatDate.getMonth() + 1).toString();
    formattedDate += '/' + formatDate.getDate();
    return formattedDate;
  }

  /*
    POSSIBLE TIMESLOT
    Check if the current timeslot should be selectable or not
    1. Check if the day is before today
    2. Check if the hour is within the appropriate range(Mon&Sat: 8-5, Tue-Fri: 11-7)
  */
  possibleTimeslot(date: number, hour: number): boolean {
    if (date + hour * this.MILLISECONDS_IN_HOUR < this.TODAY) {
      return false;
    }

    const day = new Date(date).getDay();
    if (day === 1 || day === 6) { // Mon or Sat
      if (hour < 8 || hour > 17) {
        return false;
      } else {
        return true;
      }
    } else {
      if (hour < 11 || hour > 19) {
        return false;
      } else {
        return true;
      }
    }
  }

  /*
    ON OPEN MODAL
    Open the modal
      1. Create the configuration object
      2. Set the height of the Modal
      3. Set the width of the Modal
      4. Pass data to the Modal
      5. Open the Modal, specifying its attached component and its configurations(which also contains the passed data)

    This method fires when the user selects a valid time cell
  */
  onOpenModal(date: number, time: number): void {
    time = time * this.MILLISECONDS_IN_HOUR;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'appointmentsModal';
    dialogConfig.height = '90vh';
    dialogConfig.width = '60vw';
    dialogConfig.data = { date, time};
    // https://material.angular.io/components/dialog/overview
    this.matDialog.open(AppointmentsModalComponent, dialogConfig);
  }
}
