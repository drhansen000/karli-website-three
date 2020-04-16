import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private fragmentSubscription: Subscription;
  @ViewChild('#services', {static: false}) servicesView: ElementRef;
  @ViewChild('products', {static: false}) productsView: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        document.querySelector('#' + fragment).scrollIntoView();
      }
    });
  }

  ngOnDestroy() {
    if (this.fragmentSubscription !== undefined) {
      this.fragmentSubscription.unsubscribe();
    }
  }
}
