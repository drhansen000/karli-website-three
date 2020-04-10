import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

/*
  TODO LIST
  1. Display the user details
  2. Allow the user to alter their details and store those changes in the database
  3. When the user logs out, navigate them to the login page and display a message
*/
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  constructor(private accountService: AccountService, private router: Router) {
    this.user = accountService.getUser();
  }

  ngOnInit(): void {
  }

  /*
    ON LOGOUT
    Log the user out of their account
    1. Overwrite the session variable 'loggedIn' with f(false)
    TODO 2. Navigate the user back to the login page
    TODO 3. Display a message that the user was logged out

    This method fires when the user clicks the logout button
  */
  onLogout(): void {
    sessionStorage.setItem('loggedIn', 'f');
    this.router.navigate(['/login']);
  }

}
