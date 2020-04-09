import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceListService } from 'src/app/service-list.service';
import { take } from 'rxjs/operators';
import { Service } from 'src/app/service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  service: Service;
  private paramsSubscription: Subscription;
  constructor(private serviceListService: ServiceListService, private route: ActivatedRoute) {}

  /*
    NG ON INIT
    Initialize variables upon which the DOM is dependent
    2. Get the id being passed via the url
    1. Initialize our service by calling our getService method and passing it the recieved id
  */
  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.getService(id);
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
      b. Then call our method again
  */
  private getService(id: number): void {
    this.serviceListService.getService(id).pipe(take(1)).subscribe((service) => {
      if (service === null) {
        this.serviceListService.getServices().pipe(take(1)).subscribe(() => {
          this.getService(id);
        });
      } else {
        this.service = {
          name: service.name,
          imgUrl: service.imgUrl,
          price: service.price,
          duration: service.duration,
          descriptions: service.descriptions
        };
      }
    });
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
