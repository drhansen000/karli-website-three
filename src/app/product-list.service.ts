import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private products: Product[] = [];
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = '/assets/json/products.json';
  }

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
          tap((data) => {
            this.products = data;
          }),
          catchError(this.handleError)
        );
    }
  }

  /*
    GET PRODUCT
    Get an individual product from the products array
    1. If the products array has been populated, return the desired product based on its index
    2. Otherwise, return null
  */
 getProduct(id: number): Observable<Product> {
  if (this.products.length > 0) {
    return of(this.products[id]);
  } else {
    return of(null);
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
