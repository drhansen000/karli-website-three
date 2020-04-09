import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductListService } from 'src/app/product-list.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  private paramsSubscription: Subscription;

  constructor(private productListService: ProductListService, private route: ActivatedRoute) { }

  /*
    NG ON INIT
    Instantiate all variables upon which the DOM relies
    1. Get the id from the url
    2. Pass the id into the getProduct method
  */
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.getProduct(id);
    });
  }

  /*
    GET PRODUCT
    Use productListService to get the specific product
    1. Use productListService's getProduct method
    2. If we found a product
      a. Set our product to the found product
    3. Otherwise
      a. Populate productListService's products array
      b. Then call our method again
  */
 private getProduct(id: number): void {
  this.productListService.getProduct(id).pipe(take(1)).subscribe((product) => {
    if (product === null) {
      this.productListService.getProducts().pipe(take(1)).subscribe(() => {
        this.getProduct(id);
      });
    } else {
      this.product = {
        name: product.name,
        imgUrl: product.imgUrl,
        price: product.price,
        size: product.size
      };
    }
  });
}

}
