import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AccountService } from '../../services/account.service';
import { ProductListService } from 'src/app/services/product-list.service';
import { CartItem } from '../../interfaces/cart-item.interface';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  products: Product[] = [];

  constructor(private router: Router, private accountService: AccountService, private productService: ProductListService) {
    this.cart = this.accountService.cart;
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(take(1))
      .subscribe((products: Product[]) => {
        this.products = products;
    });
  }

  /*
    ON DELETE ITEM
    Delete an item from the cart
    1. Currently this method only removes the item from the cart array
  */
  onDeleteItem(itemId: number) {
    this.cart.splice(itemId, 1);
  }

  /*
    ON CHECKOUT
    Checkout the items in the cart
    1. It currently does nothing but bring them to the products page
  */
  onCheckout(): void {
    console.log('We checked out!');
    this.router.navigate(['/products']);
  }

}
