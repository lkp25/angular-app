import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from './user.model';

interface AuthResponseData {
  expIn: string;
  message: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  //behavior subject because data service needs access to user value
  //at any point of time not just when it changes and was emitted on login.
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signup(userData: { name: string; pass: string }) {
    return this.http.post('http://localhost:8080/signup', {
      name: userData.name,
      pass: userData.pass,
    });
  }

  login(userData: { name: string; pass: string }) {
    return this.http
      .post<AuthResponseData>('http://localhost:8080/login', {
        //request body
        name: userData.name,
        pass: userData.pass,
      })
      .pipe(
        //error catching pipe
        catchError((receivedError) => {
          let error = `the error received is ${receivedError}`;
          return throwError(error);
        }),
        //tap the response object and fill the user Subject
        // with valid token from server, emit this new user to all functions
        tap((data) => {
          console.log(data);
          const refreshToken = data.refreshToken;
          const expDate = data.expIn;
          const token = data.accessToken;
          const user = new User(userData.name, token, expDate, refreshToken);

          //emit the constructed user with his token
          this.user.next(user);
        })
      );
  }



  logout() {
    //   for deleting refresh token on server!
    let refreshToken: string;
    this.user.pipe(take(1)).subscribe((user) => {
      console.log(user);
      //HERE we call the token which will be set to null if it expired,
      // as stated in User model - user.token is a getter function
      refreshToken = user.refreshToken;
    });
    this.http
      .post('http://localhost:8080/logout', {
        //request body
        refreshToken: refreshToken,
      })
      .subscribe((response) => {
        console.log(response);
      });

    //for the view update:
    this.user.next(null);
  }



  refreshToken() {
    let userData: User
    
    this.user.pipe(take(1)).subscribe((user) => {
      console.log(user);
      //pass the user object to server so that access token can be replaced using refresh token      
      userData = user
    });
    this.http
      .post<User>('http://localhost:8080/refreshToken', {
        userData: userData
      })
      .subscribe((refreshedUserData) => {
        {
            
            console.log(refreshedUserData);
            const refreshedUser = new User(
                refreshedUserData.name, 
                refreshedUserData._token, 
                refreshedUserData._tokenExpDate, 
                refreshedUserData.refreshToken
            )
            
            this.user.next(refreshedUser)
        }
      });
  }
}
