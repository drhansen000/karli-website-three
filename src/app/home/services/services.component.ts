import { Component, OnInit } from '@angular/core';
import { ServicesListService } from 'src/app/servicesList.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services = [];

  constructor(private serviceListService: ServicesListService) {}

  ngOnInit(): void {
    this.serviceListService.getServices().subscribe((services) => {
      this.services = services;
    });
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
