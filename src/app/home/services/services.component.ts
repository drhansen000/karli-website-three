import { Component, OnInit } from '@angular/core';
import { ServiceListService } from 'src/app/service-list.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services = [];

  constructor(private serviceListService: ServiceListService) {}

  ngOnInit(): void {
    this.serviceListService.getServices()
      .pipe(take(1)) // After the first value is returned, unsubscribe
      .subscribe((services) => {
        this.services = services;
    });
  }
}
