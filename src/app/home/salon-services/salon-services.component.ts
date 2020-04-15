import { Component, OnInit } from '@angular/core';
import { ServiceListService } from 'src/app/services/service-list.service';
import { take } from 'rxjs/operators';

import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-salon-services',
  templateUrl: './salon-services.component.html',
  styleUrls: ['./salon-services.component.css']
})
export class SalonServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceListService: ServiceListService) {}

  ngOnInit(): void {
    this.serviceListService.getServices()
      .pipe(take(1)) // After the first value is returned, unsubscribe
      .subscribe((services) => {
        this.services = services;
    });
  }
}
