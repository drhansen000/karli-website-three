import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;

  constructor() {
    this.products = [];
  }

  ngOnInit(): void {
    this.getProducts('/assets/json/products.json');
  }

  getProducts(url): void {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('ERROR: Problem fetching file');
        }
      })
      .then((data) => {
        data = data.Products;
        for (const item of data) {
          this.products.push({
            name: item.name,
            image: item.image,
            price: item.price,
            size: item.size
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

}

interface Product {
  name: string;
  image: string;
  price: number;
  size: number;
}
