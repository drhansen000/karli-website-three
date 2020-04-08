import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  /*
    ON LOGIN
    Check if the user entered a correct email and password combination
    TODO 1. Check if the email input exists within the database
    TODO 2. Check if the password input matches the password associated with the email found in the database

    This method fires once the user selects the login button
  */
  onLogin(): void {
    console.log(this.email);
    console.log(this.password);
    sessionStorage.setItem('loggedIn', 't');
    this.router.navigate(['/home']);
  }
}
