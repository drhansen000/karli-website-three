import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Service } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceListService {
  private services: Service[] = [];
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = '/assets/json/services.json';
  }

  /*
    GET SERVICES
    Get an array of services either from the specified url or from our already populated services array
    1. If our services array has already been populated, then return it
    2. Get the data from the specified url
    3. Attach a pipe to:
      a. Use its tap method to look at the response we've received
      (whether it be the data in the repository or the data returned from our handleError method)
      b. Use its catchError method to handle any error that might occur during the retrieval process
  */
  getServices(): Observable<Service[]> {
    if (this.services.length > 0) {
      return of(this.services);
    } else {
      return this.httpClient.get<Service[]>(this.url)
        .pipe(
          tap((data) => {
            this.services = data;
          }),
          catchError(this.handleError)
        );
    }
  }

  /*
    GET SERVICE
    Get the service from the passed index
    1. If services is populated, return the desired Service
    2. Fetch the services in a JSON  format from the url
    3. Convert the JSON into an object
    4. Store the services
    5. Return the specified service at the desired index
    6. Catch any errors that might occur during steps 2 - 5
  */
 getService(id: number): Observable<Service> {
  if (this.services.length > 0) {
    return of(this.services[id]);
  } else {
    return from(fetch(this.url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error occurred fetching at: ' + this.url);
      })
      .then((services: Service[]) => {
        this.services = services;
        return services[id];
      })
      .catch((error) => {
        console.log(error.message);
        return null;
      }));
  }
}

  /*
    HANDLE ERROR
    Handle an error made by an HttpClient method
    1. Display the error message in the console
    2. Return the current products array
  */
  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return of(this.services);
  }
}
