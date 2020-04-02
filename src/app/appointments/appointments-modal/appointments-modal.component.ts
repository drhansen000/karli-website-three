import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments-modal',
  templateUrl: './appointments-modal.component.html',
  styleUrls: ['./appointments-modal.component.css']
})
export class AppointmentsModalComponent implements OnInit {
  services: Array<Service>;
  constructor() {
    this.services = [];
  }

  ngOnInit(): void {
    this.getServices('/assets/json/services.json');
  }

  getServices(url): void {
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

interface Service {
  name: string;
  image: string;
  price: string;
  duration: string;
  description?: string;
}
