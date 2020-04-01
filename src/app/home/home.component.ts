import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  services: Array<Service>;
  products: Array<Product>;

  constructor() {}

  ngOnInit(): void {
    this.getServices('/assets/json/services.json');
    this.getProducts('/assets/json/products.json');
  }

  getServices(url): void {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('ERROR: Problem fetching file');
        }
      })
      .then((data) => {
        this.services = data.Services;
      })
      .catch((error) => {
        console.log(error.message);
      });
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
        this.products = data.Products;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

}

interface Service {
  name: string;
  image: string;
  price: string;
  duration: string;
}

interface Product {
  name: string;
  image: string;
  price: number;
  size: number;
}
