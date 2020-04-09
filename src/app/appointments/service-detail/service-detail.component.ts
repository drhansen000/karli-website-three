import { Component, OnInit } from '@angular/core';
import { ServiceListService } from 'src/app/service-list.service';
import { take } from 'rxjs/operators';
import { Service } from 'src/app/service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  service: Service;
  constructor(private serviceListService: ServiceListService) { }

  ngOnInit(): void {
    this.serviceListService.getService(0).pipe(take(1)).subscribe((service) => {
      this.service = {
        name: service.name,
        imgUrl: service.imgUrl,
        price: service.price,
        duration: service.duration,
        descriptions: service.descriptions
      };
    });
  }

}
