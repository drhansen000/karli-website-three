import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { ProductListService } from 'src/app/services/product-list.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productListService: ProductListService) {}

  ngOnInit(): void {
    this.productListService.getProducts()
      .pipe(take(1))
      .subscribe((products: Product[]) => {
        this.products = products;
    });
  }
}
