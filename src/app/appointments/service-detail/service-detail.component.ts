import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Service } from 'src/app/interfaces/service.interface';
import { ServiceListService } from 'src/app/services/service-list.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  service: Service = null;
  id = -1;
  private paramsSubscription: Subscription;
  constructor(private serviceListService: ServiceListService,
              private route: ActivatedRoute,
              private router: Router) {}

  /*
    NG ON INIT
    Initialize variables upon which the DOM is dependent
    2. Get the id being passed via the url
    1. Initialize our service by calling our getService method and passing it the recieved id
  */
  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.getService(this.id);
    });
  }

  /*
    GET SERVICE
    Use serviceListService to get the specific service
    1. Use serviceListService's getService method
    2. If we found a service
      a. Set our service to the found service
    3. Otherwise
      a. Populate serviceListService's services array
      b. Call our method again
  */
  private getService(id: number): void {
    this.serviceListService.getService(id).pipe(take(1)).subscribe((service) => {
        this.service = {
          name: service.name,
          imgUrl: service.imgUrl,
          price: service.price,
          duration: service.duration,
          descriptions: service.descriptions
        };
    });
  }

  onCreateAppointment() {
    sessionStorage.setItem('serviceId', '' + this.id);
    this.router.navigate(['/appointments']);
  }

  /*
    NG ON DESTROY
    Destroy any subscriptions
    1. Destroy the ActivatedRoute's params subscription (It's automatically unsubscribed, but it's still good practice)

    This method fires when the component is destroyed
  */
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
