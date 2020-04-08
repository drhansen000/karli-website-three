import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  startDate = new Date().getTime(); // Whenever this variable changes, it updates the appointment table
  currentWeek: boolean;
  latestWeek: boolean;
  private readonly MILLISECONDS_IN_DAY: number;
  private readonly MILLISECONDS_IN_HOUR: number;
  private readonly TODAY: number;
  private readonly MAX_DATE: number;
  private readonly EIGHT_WEEKS: number;

  /*
    CONSTRUCTOR
    Set variables before the view is created
    1. Set the startDate to Monday so that the table can start from the right day
    2. Get the current day for comparison purposes(added +1 to optimize later comparisons from '<=' to '<')
    3. Get the latest week's Monday for comparison purposes(eight weeks from the week's monday[-1 to optimize comparisons])
  */
  constructor() {
    this.MILLISECONDS_IN_DAY = 86400000;
    this.MILLISECONDS_IN_HOUR = 3600000;
    this.EIGHT_WEEKS = this.MILLISECONDS_IN_DAY * 56;
    this.setStartToMonday();
    this.TODAY = this.startDate + 1;
    this.MAX_DATE = this.startDate + this.EIGHT_WEEKS - 1;
    this.currentWeek = true;
    this.latestWeek = false;
  }

  ngOnInit(): void {}

  /*
    GET IS MOBILE
    Check if the current screen is a mobile device
    1. Return whether the window width is under 800 pixels
  */
  getIsMobile(): boolean {
    return window.innerWidth < 800;
  }

  /*
    SET START TO MONDAY
    Set the start date to Monday of that week
    1. Get the day of the week of startDate
    2. Get the offset(day - 1[because we're starting on Monday which is 1])
    3. Get the current hour
    3. Subtract the offset and the current hour from startDate

    This method executes when we first load this component
  */
  private setStartToMonday(): void {
    const TODAY = new Date(this.startDate);
    const DAY = TODAY.getDay();
    let OFFSET = (DAY - 1) * this.MILLISECONDS_IN_DAY;
    const HOUR = TODAY.getHours() * this.MILLISECONDS_IN_HOUR;
    OFFSET += HOUR;
    OFFSET += OFFSET % this.MILLISECONDS_IN_HOUR;
    this.startDate -= OFFSET;
  }

  /*
    GET NEXT WEEK
    Set the startDate forwards on week

    This method fires every time the user click the next week button
  */
  getNextWeek(): void {
    this.startDate += this.MILLISECONDS_IN_DAY * 7;
    this.currentWeek = false;
    if (this.startDate > this.MAX_DATE) {
      this.latestWeek = true;
    }
  }

  /*
    GET PREVIOUS WEEK
    Set the startDate backwards one week

    This method fires every time the user clicks the previous week button
  */
  getPreviousWeek(): void {
    this.startDate -= this.MILLISECONDS_IN_DAY * 7;
    this.latestWeek = false;
    if (this.startDate < this.TODAY) {
      this.currentWeek = true;
    }
  }
}
