import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/*
  TODO:
    1. Navigate to fragment on click redirect
*/

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSublist(fragment: string) {
    this.router.navigate(['/home'], {fragment});
  }

}
