import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = '/assets/json/users.json';
   }

   /*
     LOGIN
     Return the user
   */
  login(email: string, password: string): Observable<User> {
    return from(fetch(this.url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error occurred trying to fetch file at: ' + this.url);
      })
      .then((users) => {
        // Find the user in the repository
        let matchedUser = null;
        for (const user of users) {
          if (user.email === email) {
            matchedUser = user;
            break;
          }
        }

        if (matchedUser === null) { // Couldn't find them
          return null;
        }

        // Check against the user's password
        if (matchedUser.password === password) {
          // Don't reveal the password more than we need to
          matchedUser = {name: matchedUser.name, phone: matchedUser.phone, email: matchedUser.email, password: ''};
          return matchedUser;
        } else {
          return null;
        }
      })
      .catch((error: Error) => {
        console.error(error.message);
      }));

  }
}
