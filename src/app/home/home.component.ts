import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

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
        this.buildServices(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  buildServices(services): void {
    console.log(services);
    services = services.Services;
    console.log(services);
    const serviceList = document.querySelector('#services');
    let servicesDisplay = '';
    for (const service of services) {
      servicesDisplay += '<li class="service">';
      servicesDisplay += '<a routerLink="/appointments" title="View details of ' + service.name + ' service">';
      servicesDisplay += '<img src="' + service.image + '" alt="' + service.name + ' example">';
      servicesDisplay += '<ul class="details">';
      servicesDisplay += '<li class="detail">' + service.name + '</li>';
      servicesDisplay += '<li class="detail">$' + service.price + '</li>';
      servicesDisplay += '<li class="detail">' + service.duration + ' minutes</li>';
      servicesDisplay += '</ul></<ul></a></li>';
    }
    serviceList.innerHTML = servicesDisplay;
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
        this.buildProducts(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  buildProducts(products): void {
    console.log(products);
    products = products.Products;
    console.log(products);
    const productList = document.querySelector('#products');
    let productsDisplay = '';
    for (const product of products) {
      productsDisplay += '<li class="product">';
      productsDisplay += '<a routerLink="/products" title="View details of ' + product.name + '">';
      productsDisplay += '<img src="' + product.image + '" alt="' + product.name + '">';
      productsDisplay += '<ul class="details">';
      productsDisplay += '<li class="detail">' + product.name + '</li>';
      productsDisplay += '<li class="detail">$' + product.price + '</li>';
      productsDisplay += '<li class="detail">' + product.size + 'oz</li>';
      productsDisplay += '</ul></<ul></a></li>';
    }
    productList.innerHTML = productsDisplay;
  }
}
