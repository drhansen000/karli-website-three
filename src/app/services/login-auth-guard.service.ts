import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  /*
    CAN ACTIVATE
    Implement the canActivate method from CanActivate to check if the user is logged in
    1. Return whether the user is logged in(utilizing sessionStorage)

    This method fires when it's attached to routes that rely on the user being logged in
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('loggedIn') === 't') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
