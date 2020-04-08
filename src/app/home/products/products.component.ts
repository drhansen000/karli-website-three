import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/product-list.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];

  constructor(private productListService: ProductListService) {}

  ngOnInit(): void {
    this.productListService.getProducts()
      .pipe(take(1))
      .subscribe((products) => {
        this.products = products;
      }
    );
  }
}
