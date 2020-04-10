import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceListService } from 'src/app/service-list.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Service } from 'src/app/service';

/*
  TODOS
    1. Use form control to:
      a. Prompt the user to fill each required input field
      b. Notify the user of the missing input if they think they try to click submit
      c. Notify the user if any input is incorrect
    2. Create patterns for certain input fields(phone, email, picture?)
    3. Use service to get Services
    4. Save input information as draft if they so choose
*/
@Component({
  selector: 'app-appointments-modal',
  templateUrl: './appointments-modal.component.html',
  styleUrls: ['./appointments-modal.component.css']
})
export class AppointmentsModalComponent implements OnInit {
  // Time variables
  private readonly TODAY: number;
  private readonly MILLISECONDS_IN_DAY: number;
  private readonly MILLISECONDS_IN_HOUR: number;
  private readonly MILLISECONDS_IN_MINUTE: number;
  private readonly EIGHT_WEEKS: number;
  dateTime: number; // Date input field listens for this
  startTime: number; // Start time input field listens for this
  endTime: number; // End time input field listens for this
  // Service variables
  services = [];
  serviceIndex: number; // Service select field listens for this
  selectedService: Service;
  price: string; // Price p elements listens for this
  // User variables (potentially passed in)
  name: string;
  phone: string;
  email: string;
  // Other Appointment variables
  picture: string;
  comments: string;

  /*
    CONSTRUCTOR
    Instantiate all of the variables we don't get from getServices

    TODO:
      1. Optionally retrieve user data and store it into name and phone and/or email
  */
  constructor(@Inject(MAT_DIALOG_DATA) public data, private serviceListService: ServiceListService) {
    this.TODAY = new Date().getTime();
    this.MILLISECONDS_IN_DAY = 86400000;
    this.MILLISECONDS_IN_HOUR = 3600000;
    this.MILLISECONDS_IN_MINUTE = 60000;
    this.EIGHT_WEEKS = this.MILLISECONDS_IN_DAY * 56;
    this.dateTime = data.date;
    this.startTime = data.time;

    this.serviceIndex = 0;

    this.name = '';
    this.phone = '';
    this.email = '';
    this.picture = '';
    this.comments = '';
  }

  /*
    NG ON INIT
    Initialize all of the variables upon which our DOM relies
    1. Subscribe to getServices() to populate our services array
    2. Once we've retrieved our services
      a. Store them in the services array
      b. Unsubscribe to free up resources
      c. Initialize the selectedService(If there's one in the Session use it, otherwise start with the first one)
      d. Initialize the appointment's end time
    3. If they're logged in, get their user information to auto-populate the input fields
  */
  ngOnInit(): void {
    this.serviceListService.getServices()
      .pipe(take(1)) // After the first value is returned, unsubscribe
      .subscribe((services) => {
        this.services = services;
        if (sessionStorage.getItem('serviceId') != null) {
          this.serviceIndex = sessionStorage.getItem('serviceId') as unknown as number;
        }
        this.selectedService = this.services[this.serviceIndex];
        this.price = this.selectedService.price;
        this.setEndTime();
    });
    if (sessionStorage.getItem('name') != null) {
      this.name = sessionStorage.getItem('name');
    }
    if (sessionStorage.getItem('email') != null) {
      this.email = sessionStorage.getItem('email');
    }

    if (sessionStorage.getItem('phone') != null) {
      this.phone = sessionStorage.getItem('phone');
    }
  }

  /*
    SET END TIME
      Set the end time the number of milliseconds multiplied by the duration from the start time. We use milliseconds in order to
      auto-populate the input field.

      This method fires every time either the start time or the selected Service change.

      The end time input field will update once this method executes
  */
  private setEndTime(): void {
    this.endTime = this.startTime + (this.selectedService.duration * this.MILLISECONDS_IN_MINUTE);
  }

  /*
    SET START TIME
    Set the start time, then set the end time according to the new start time

    This method fires every time the user inputs into the start time input field
  */
  setStartTime($event) {
    this.startTime = $event.target.valueAsNumber;
    this.setEndTime();
  }

  /*
    ON CHANGE SERVICE
    Update the currently selected service based on the index in the select field, then update appointment's end time accordingly

    This method fires every time the user selects a different Service option
  */
  onChangeService(): void {
    this.selectedService = this.services[this.serviceIndex];
    this.setEndTime();
    this.price = this.selectedService.price;
  }

  /*
    ON CHANGE DATE
    Update the date(in milliseconds) based on the user input
    1. Get the date input's value as a number in milliseconds
    2. Tell the program that the date's changed(the date input is behind by one day)

    This method fires whenever the user changes the date
  */
  onChangeDate($event): void {
    this.dateTime = $event.target.valueAsNumber;
  }

  /*
    TEST COMPLETION
    A simple method to test our formComplete method
    1. Call formComplete()
    2. console.log the result
  */
  testCompletion(): void {
    console.log('Form complete: ' + this.formComplete());
  }

  /*
    FORM COMPLETE
    Check that each required input field is filled out correctly
      1. Ensure that serviceIndex is within bounds
      2. Ensure that the appointment date is filled and within bounds(from today until 8 weeks into the future and not Sunday)
      3. Ensure that the start time is filled and within bounds(Tue-Fri: 11-7, Mon & Sat: 8-5)
      4. Ensure that the end time is within bounds(Tue-Fri: 11-7, Mon & Sat: 8-5)
      5. Ensure that they entered a name
      6. Ensure that they entered either a phone number or email
      7. TODO: Ensure that the picture is valid(research this later)
    Return false if anything was wrong, otherwise, return true

    This method fires every time an input field is altered
  */
  formComplete(): boolean {
    if (this.serviceIndex < 0 || this.serviceIndex > this.services.length) {
      return false;
    }

    const date = this.setTimeToZero(new Date(this.dateTime));

    if (date.getDay() === 0) {
      console.log('Date is on a Sunday!');
      return false;
    }

    if (this.dateTime + this.startTime <= this.TODAY) { // dateTime is in the past
      console.log('DateTime is in the past');
      return false;
    }

    if (this.dateTime + this.startTime > this.TODAY + this.EIGHT_WEEKS) { // dateTime is more than eight weeks away
      console.log('DateTime is beyond 8 weeks away!');
      return false;
    }

    if (this.startTime < this.getEarliestHour(date)) {
      console.log('Time starts before salon opens!');
      return false;
    }

    if (this.endTime > this.getLatestHour(date)) {
      console.log('Time ends after salon closes!');
      return false;
    }

    if (this.name.length < 1) {
      console.log('Name is empty!');
      return false;
    }

    // TODO: Add better logic
    if (this.phone.length < 1 && this.email.length < 1) {
      console.log('Both phone and email are empty!');
      return false;
    }

    // TODO: Add logic for picture input validation
    console.log('The form is complete!');
    return true;
  }

  /*
    GET EARLIEST HOUR
    Get the earliest hour for the selected date
    1. Check what day of the week it is
    2. Mon & Sat open at 8am, Tue-Fri open at 11am
    3. Return the earliest hour in milliseconds
  */
  private getEarliestHour(date: Date): number {
    const day = date.getDay();
    if (day === 1 || day === 6) {
      return 8 * this.MILLISECONDS_IN_HOUR;
    } else {
      return 11 * this.MILLISECONDS_IN_HOUR;
    }
  }

  /*
    GET LATEST HOUR
    1. Check what day of the week it is
    2. Mon & Sat close at 5pm, Tue-Fri close at 7pm
    3. Return the latest hour in milliseconds
  */
  private getLatestHour(date: Date) {
    const day = date.getDay();
    if (day === 1 || day === 6) {
      return 17 * this.MILLISECONDS_IN_HOUR;
    } else {
      return 19 * this.MILLISECONDS_IN_HOUR;
    }
  }

  /*
    SET TIME TO ZERO
    Set the dateTime to 00:00, which will be used to see if the selected time and day are in the past
    1. Get the current hour of the day
    2. Find the difference between the date's time and 24(HTML date input valueAsNumber returns 1700 of the previous day)
    2. Add the difference to the date time, setting it to 00:00
  */
  private setTimeToZero(date: Date): Date {
    const HOUR = date.getHours();
    if (HOUR !== 0) {
      const DIFFERENCE = (24 % date.getHours()) * this.MILLISECONDS_IN_HOUR;
      this.dateTime += DIFFERENCE;
    }
    return new Date(this.dateTime);
  }
}
