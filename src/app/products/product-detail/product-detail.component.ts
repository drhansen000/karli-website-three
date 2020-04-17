import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';

import { Product } from 'src/app/interfaces/product.interface';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // product: Product = {name: '', imgUrl: '/assets/images/placeholder.jpg', price: 0, size: 0, quantity: 0};
  product: Product = null;
  private id;

  constructor(private productListService: ProductListService, private route: ActivatedRoute) {}

  /*
    NG ON INIT
    Instantiate all variables upon which the DOM relies
    1. Get the id from the url
    2. The the product at index of id
  */
  ngOnInit(): void {
      this.id = this.route.snapshot.params.id;
      this.productListService.getProduct(this.id).pipe(take(1)).subscribe((product: Product) => {
        this.product = product;
      });
  }

  /*
    BUILD NUMBER ARRAY
    The ngFor directive doesn't allow for the use of iterating n times, therefore, create a simple array of numbers to populate the
    quantity select element.
    1. If the product's quantity is less than one, than it's out of stock and don't populate the select
    2. Create an array of numbers up to the product's quantity
    3. Return the array
  */
  buildNumberArray(quantity: number): number[] {
    if (quantity < 1) {
      return [];
    }
    const quantities: number[] = [];
    for (let i = 0; i < quantity; i++) {
      quantities[i] = i + 1;
    }

    return quantities;
  }

  /*
    ON ADD TO CART
    Add the product and its quantity to the cart
    1. Get the product's id and quantity
    2. Pass it to the user's cart stored in the account service
    TODO: 3. Do some action to inform the user that they successfully add the item to the cart

    This method fires when the user clicks 'Add to Cart'
  */
  onAddToCart(quantity: number) {
    console.log('Added ' + quantity + ' of ' + this.id);
  }
}
