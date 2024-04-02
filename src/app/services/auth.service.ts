import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject, catchError } from 'rxjs';
import { map } from 'rxjs';
import { Usercredentials } from '../models/usercredentials';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
// Corresponds to the login and register mappings of the UserController.
export class AuthService {

  private baseURL = "http://localhost:8080/users";
  private platformID: any;
  constructor(private httpClient: HttpClient)
  { 
    this.platformID = inject(PLATFORM_ID);
  }
  isUserSignedIn() {
    if (isPlatformBrowser(this.platformID)) {
      if (localStorage.getItem("session")) {
        console.log("User is signed in");
        return true;
      }
      console.log("User is not signed in");
      return false;
    }
    return false;
  }
  getCurrentUserEmail() {
    if (isPlatformBrowser(this.platformID)) {
      if (localStorage.getItem("e")) {
        var d = this.decr(localStorage.getItem("e")!);
        if (!d) {
          return null;
        }
        if ((d!.length * 1274321).toString()  == (localStorage.getItem("session"))) {
          return d;
        }
      }
      else {
        return null;
      }
    }
    return null;
  }
  signOut() {
    if (isPlatformBrowser(this.platformID)) {
      localStorage.clear();
    }
  }
  getUserByID(id: number): Observable<User> {
    //getUserByID endpoint: /id/:id
    if (!this.httpClient) {
      return new Observable<User>();
    }
    else {
      try {
        return this.httpClient.get<User>(`${this.baseURL}/id/${id}`);
      }
      catch (err) {
        console.log(err);
        return new Observable<User>();
      }
    }
  }
  getUserByEmail(email: string): Observable<User> {
    //getUserByName endpoint: /email/:name
    if (!this.httpClient) {
      return new Observable<User>();
    }
    else {
      try {
        return this.httpClient.get<User>(`${this.baseURL}/email/${email}`);
      }
      catch (err) {
        console.log(err);
        return new Observable<User>();
      }
    }
  }
  // NOTE: Angular HTTP module always returns an Observable, which must be subscribed to or else nothing will happen.
  // Returns a status for a login attempt
  login(user: Usercredentials): Observable<boolean> {
    console.log("Login called: Connecting to " + this.baseURL);
    const result = new Subject<boolean>();
    if (this.httpClient) {
      // email and password are passed as a json object to backend
      this.httpClient.post(`${this.baseURL}/login`, {
        "email": user.email,
        "password": user.password
      }).subscribe({
        next: () => {
          //success
          result.next(true);
          result.complete();
          if (isPlatformBrowser(this.platformID)) {
            localStorage.setItem("session", (user.email.length * 1274321).toString());
            let encrypted = this.encr(user.email);
            localStorage.setItem("e", encrypted);
          }
          return result.asObservable();
        },
        error: () => {
          //error
          result.next(false);
          result.complete();      
          return result.asObservable();
        }
      });
    }
    else {
      console.log("HTTP Client is null");
      result.next(false);
      result.complete();
    }
    return result.asObservable();
  }
  // Returns a status for a register attempt
  register(user: User): Observable<boolean> {
    console.log("Register called: Connecting to " + this.baseURL);
    const result = new Subject<boolean>();
    // username, password and email are passed as a json object to backend
    this.httpClient.post(`${this.baseURL}/register`, {
      "userName": user.userName,
      "password": user.password,
      "email": user.email
    }).subscribe({
      next: () => {
        //success
        result.next(true);
        result.complete();
        if (isPlatformBrowser(this.platformID)) {
          localStorage.setItem("session", (user.email.length * 1274321).toString());
          let encrypted = this.encr(user.email);
          localStorage.setItem("e", encrypted);
        }
      },
      error: () => {
        //error
        result.next(false);
        result.complete();    
      },
      complete: () => {
        // this is done regardless of success or error
        console.log("Register fininshed");
      }
    });
    return result.asObservable();
  }
  doesUserNameExist(username: string): Observable<boolean> {
    console.log("Does username exist: " + username);
    const result = new Subject<boolean>();
    this.httpClient.get(`${this.baseURL}/name/${username}`).subscribe({
      next: () => {
        // user found
        console.log("Username " + username + " exists");
        result.next(true);
        result.complete();
      },
      error: () => {
        // user not found
        console.log("Username " + username + " does not exist");
        result.next(false);
        result.complete();
      }
    });
    return result.asObservable();
  }
  
  // encrypts a string
  encr(str: string): string {
    const encryptedChars = str.split('').map((char) => {
      if (char.match(/[a-zA-Z]/)) {
          const baseCharCode = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
          const shiftedCharCode = (char.charCodeAt(0) - baseCharCode + 3) % 26 + baseCharCode;
          return String.fromCharCode(shiftedCharCode);
      }
      return char; // Non-alphabetic characters remain unchanged
    });
    return encryptedChars.join('');
  }
  // decrypts a string
  decr(str: string): string {
    const decryptedChars = str.split('').map((char) => {
      if (char.match(/[a-zA-Z]/)) {
          const baseCharCode = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
          const shiftedCharCode = (char.charCodeAt(0) - baseCharCode - 3 + 26) % 26 + baseCharCode;
          return String.fromCharCode(shiftedCharCode);
      }
      return char; // Non-alphabetic characters remain unchanged
  });
  return decryptedChars.join('');
  }
}
