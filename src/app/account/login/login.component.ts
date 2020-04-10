import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../account.service';
/*
  TODO LIST
  1. Use Angular form handler
  2. Check the email & password against the database
  3. Display an error message if the login failed, otherwise, navigate to the home page
*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  message: string;
  private loginSubscription: Subscription;

  constructor(private router: Router, private accountService: AccountService) {
    this.email = '';
    this.password = '';
    this.message = '';
  }

  ngOnInit(): void {}

  /*
    ON LOGIN
    Check if the user entered a correct email and password combination
    TODO 1. Check if the email input exists within the database
    TODO 2. Check if the password input matches the password associated with the email found in the database

    This method fires once the user selects the login button
  */
  onLogin(): void {
    this.loginSubscription = this.accountService.login(this.email, this.password).subscribe((user) => {
      if (user == null) {
        this.message = 'Email or password is incorrect. Try again';
      } else {
        sessionStorage.setItem('name', user.name);
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('phone', user.phone);
        sessionStorage.setItem('loggedIn', 't');
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription !== undefined) {
      this.loginSubscription.unsubscribe();
    }
  }
}
