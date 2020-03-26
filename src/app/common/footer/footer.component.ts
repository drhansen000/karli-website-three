import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.populateCopyrightYear();
    this.populateLastModified();
  }

  populateCopyrightYear() {
    document.querySelector('#copyrightYear').textContent = '' + new Date().getFullYear();
  }

  populateLastModified() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'];
    const modifiedDate = new Date(document.lastModified);
    let modifiedDateString = days[modifiedDate.getDay()] + ', ';
    modifiedDateString += months[modifiedDate.getMonth()] + ' ';
    modifiedDateString += modifiedDate.getDate() + ', ';
    modifiedDateString += modifiedDate.getFullYear();
    document.querySelector('#lastModified').textContent += modifiedDateString;
  }

}
