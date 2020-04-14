import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subscription, from } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private products: Product[] = [];
  private url = '/assets/json/products.json';

  constructor(private httpClient: HttpClient) {}

  /*
    GET PRODUCTS
    Get an array of products either from the specified url or from our already populated products array
    1. If our products array has already been populated, then return it
    2. Get the data from the specified url
    3. Attach a pipe to:
      a. Use its tap method to look at the response we've received
      (whether it be the data in the repository or the data returned from our handleError method)
      b. Use its catchError method to handle any error that might occur during the retrieval process
  */
  getProducts(): Observable<Product[]> {
    if (this.products.length > 0) {
      return of(this.products);
    } else {
      return this.httpClient.get<Product[]>(this.url)
        .pipe(
          tap((products) => {
            for (const product of products) {
              this.products.push(product);
            }
          }),
          catchError(this.handleError)
        );
    }
  }

  /*
    GET PRODUCT
    Get the product from the passed index
    1. If products is populated, return the desired Product
    2. Fetch the products in a JSON  format from the url
    3. Convert the JSON into an object
    4. Store the products
    5. Return the specified product at the desired index
    6. Catch any errors that might occur during steps 2 - 5
  */
  getProduct(id: number): Observable<Product> {
    if (this.products.length > 0) {
      return of(this.products[id]);
    } else {
      return from(fetch(this.url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error occurred fetching at: ' + this.url);
        })
        .then((products: Product[]) => {
          this.products = products;
          return products[id];
        })
        .catch((error) => {
          console.log(error.message);
          return null;
        }));
    }
  }

  /*
    CHECK IS POPULATED
    TODO:
    1. Currently milliseconds doesn't increment from the initial passed value
    2. this.products is undefined every time
    3. setTimeout only fires once, setInterval fires every time, but its values never update
  */
  checkIsPopulated(id: number, milliseconds: number): Product {
    if (this.products.length > 0) {
      return this.products[id];
    } else {
      if (milliseconds < 3000) {
        setTimeout(this.checkIsPopulated.bind(this), 200, milliseconds + 200);
      }
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
    return of(this.products);
  }
}
