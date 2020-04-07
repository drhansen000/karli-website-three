import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  private MILLISECONDS_IN_DAY: number;
  private MILLISECONDS_IN_HOUR: number;
  date: number; // Date input field listens for this
  startTime: number; // Start time input field listens for this
  endTime: number; // End time input field listens for this
  // Service variables
  services: Array<Service>;
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
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.MILLISECONDS_IN_DAY = 86400000;
    this.MILLISECONDS_IN_HOUR = 3600000;
    this.date = data.date;
    this.startTime = data.time;
    this.services = [];

    this.name = '';
    this.phone = '';
    this.email = '';
    this.picture = '';
    this.comments = '';
  }

  /*
    NG ON INIT
    Call getServices() which will get the ball rolling
  */
  ngOnInit(): void {
    this.getServices('/assets/json/services.json');

  }

  /*
    GET SERVICES
    Get all of the Services, store them in an array, choose the default Service(if the user hasn't pre-selected one),
    and then set the end time

    This method fires once, at the beginning of the DOM creation
  */
  private getServices(url): void {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('ERROR: Problem fetching file');
        }
      })
      .then((data) => {
        data = data.Services;
        for (const item of data) {
          this.services.push({
            name: item.name,
            image: item.image,
            price: item.price,
            duration: item.duration
          });
        }
        this.serviceIndex = 0;
        this.selectedService = this.services[this.serviceIndex];
        this.price = this.selectedService.price;
        this.setEndTime();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  /*
    SET END TIME
      Set the end time the number of milliseconds multiplied by the duration from the start time. We use milliseconds in order to
      auto-populate the input field.

      This method fires every time either the start time or the selected Service change.

      The end time input field will update once this method executes
  */
  private setEndTime(): void {
    const MILLISECONDS_IN_MINUTE = 60000;
    this.endTime = this.startTime + (this.selectedService.duration * MILLISECONDS_IN_MINUTE);
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
    this.date = $event.target.valueAsNumber;
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
      2. Ensure that the appointment date is filled and within bounds(from today until 4 weeks into the future and not Sunday)
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

    const todayDate = new Date(); // TODO: +Set this to 12am
    let checkMilliseconds = this.getComparisonDate();
    checkMilliseconds += this.startTime;
    const checkDate = new Date(checkMilliseconds);
    const SIX_WEEKS = this.MILLISECONDS_IN_DAY * 42;
    if (checkMilliseconds < todayDate.getTime() ||
      checkMilliseconds > todayDate.getTime() + SIX_WEEKS ||
      checkDate.getDay() === 0) {
      console.log('Date out of bounds!');
      return false;
    }

    const EARLIEST_TIME = this.getEarliestHour();
    if (this.startTime < EARLIEST_TIME) {
      console.log('Start time out of bounds!');
      return false;
    }

    const LATEST_TIME = this.getLatestHour();
    if (this.endTime > LATEST_TIME) {
      console.log('End time out of bounds!');
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
    1. Convert the date from milliseconds into a Date object
    2. Check what day of the week it is
    3. Mon & Sat open at 8am, Tue-Fri open at 11am
    4. Return the earliest hour in milliseconds
  */
  private getEarliestHour(): number {
    const tempDate = new Date(this.date);
    const day = tempDate.getDay();
    if (day === 1 || day === 6) {
      return 8 * this.MILLISECONDS_IN_HOUR;
    } else {
      return 11 * this.MILLISECONDS_IN_HOUR;
    }
  }

  /*
    GET LATEST HOUR
    1. Convert the date from milliseconds into a Date object
    2. Check what day of the week it is
    3. Mon & Sat close at 5pm, Tue-Fri close at 7pm
    4. Return the latest hour in milliseconds
  */
  private getLatestHour() {
    const tempDate = new Date(this.date);
    const day = tempDate.getDay();
    if (day === 1 || day === 6) {
      return 17 * this.MILLISECONDS_IN_HOUR;
    } else {
      return 19 * this.MILLISECONDS_IN_HOUR;
    }
  }

  /*
    GET COMPARISON Date
    Return the correct date for us to check against the current date
    1. Check if the date has been changed by user input or not
    2. Set the time of the date to 17:00(For some reason JS starts counting hours of the day from 17:00)
    3. Move the date one forward
      (either it's one behind because the HTML input date is off by one day in milliseconds,
      or the subtracted difference when resetting the date set it back a day)
    4. Set the date to 00:00
    5. Return the comparison date
  */
  private getComparisonDate(): number {
    let tempDate = this.date;
    if (tempDate % this.MILLISECONDS_IN_DAY !== 0) {
      tempDate -= tempDate % this.MILLISECONDS_IN_DAY; // Set it to 17:00
    }
    tempDate += this.MILLISECONDS_IN_DAY;
    tempDate -= 17 * this.MILLISECONDS_IN_HOUR;
    return tempDate;
  }
}

interface Service {
  name: string;
  image: string;
  price: string;
  duration: number;
  description?: string;
}
