import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { CartItem } from '../interfaces/cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private usersUrl = '/assets/json/users.json';
  private cartsUrl = '/assets/json/carts.json';
  private user: User = {
    name: '',
    phone: '',
    email: '',
    password: '',
    cartId: -1
  };

  cart: CartItem[] = [];

   /*
    LOGIN
    If the password and email are correct, then store the user and its information. Either way, notify the client
    1. Fetch the users repository
    2. Find a user with the passed email
    3. Check that the user's password matches the passed password
    4. Store the user
    5. Get the user's cart
    6. Return the result of steps 1-3
   */
  login(email: string, password: string): Observable<boolean> {
    return from(fetch(this.usersUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error occurred trying to fetch file at: ' + this.usersUrl);
      })
      .then((users) => {
        // Find the user in the repository
        let matchedUser: User = null;
        for (const user of users) {
          if (user.email === email) {
            matchedUser = user;
            break;
          }
        }

        if (matchedUser === null) { // Couldn't find them
          return false;
        }

        // Check against the user's password
        if (matchedUser.password === password) {
          this.user = matchedUser; // Store the user data
          this.getCart(this.user.cartId);
          return true;
        } else {
          return false;
        }
      })
      .catch((error: Error) => {
        console.error(error.message);
        return false;
      }));
  }

  /*
    REGISTER USER
    Create a user based on the information provided
    1. Check that the email doesn't already exist
    2. Insert the user's information into the repository
  */
  registerUser(name: string, email: string, phone: string, password: string): Observable<string> {
    let message = '';
    return from(fetch(this.usersUrl)
      .then((response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error occurred trying to fetch at: ' + this.usersUrl);
      }))
      .then((users) => {
        for (const user of users) {
          if (user.email === email) {
            message = 'You already have an account!';
            return(message);
          }
        }
        message = 'You have successfully created your account. Please login';
        return(message);
      })
      .catch((error: Error) => {
        console.error(error.message);
        message = 'We were unable to process your request';
        return(message);
      }));
  }

  /*
    GET CART
    Get the current user's cart
    1. Get the cart.json
    2. Convert it into an object(in this case an array of arrays of Product)
    3. Find the cart array within outer array
    4. Store the found cart array within our account service
  */
  getCart(cartId: number): void {
    fetch(this.cartsUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error occurred trying to fetch at: ' + this.cartsUrl);
      })
      .then((carts) => {
        this.cart = carts[cartId];
        return this.cart;
      })
      .catch((error: Error) => {
        console.error(error.message);
        return this.cart;
      });
  }

  /*
    GET USER
    Get the user from our service
    1. Return the user currently stored in the account service
  */
  getUser(): User {
    return this.user;
  }
}
