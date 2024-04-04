import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject, catchError } from 'rxjs';
import { map } from 'rxjs';
import { Usercredentials } from '../models/usercredentials';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';
import { PersonalityService } from './personality.service';

@Injectable({
  providedIn: 'root'
})
// Corresponds to the login and register mappings of the UserController.
export class AuthService {

  private baseURL = "http://localhost:8080/users";
  private platformID: any;
  constructor(private httpClient: HttpClient, private ps: PersonalityService)
  { 
    this.platformID = inject(PLATFORM_ID);
  }
  isUserSignedIn() {
    if (isPlatformBrowser(this.platformID)) {
      if (localStorage.getItem("session")) {
        return true;
      }
      return false;
    }
    return false;
  }
  isTakingQuiz() {
    if (isPlatformBrowser(this.platformID)) {
      let _ = "" + localStorage.getItem("session");
      if (_[0] == "0") {
        return true;
      }
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
        var s = localStorage.getItem("session");
        if (!s) {
          return null;
        }
        if ((d!.length * 1274321).toString()  == (s!.substring(1))) {
          return d;
        }
        else {
          return null;
        }
      }
      else {
        return null;
      }
    }
    return null;
  }
  signOut(): boolean | void {
    if (isPlatformBrowser(this.platformID)) {
      // get email from local,
      let token = localStorage.getItem("e");
      let email = this.decr(token ? token : '');
      if (!email) {
        localStorage.clear();
        return false;
      }
      // use signout endpoint,
      if (this.httpClient) {
        this.httpClient.post(`${this.baseURL}/signout/email`, {
          "email": email,
          "password": ''
        }).subscribe({
          next: () => {
            // then clear
            localStorage.clear();
            return true;
          },
          error: (err) => {
            // then clear
            localStorage.clear();
            return false;
          }
        })
      }
      else { return false; }
    }
    else {
      return false;
    }
  }
  updateSessionUponQuizSubmit() : boolean {
    if (isPlatformBrowser(this.platformID)) {
      let s = localStorage.getItem("session")
      if (s) {
        const rb = new Uint32Array(1);
        window.crypto.getRandomValues(rb);
        let rnd = Math.round((rb[0] / (0xffffffff + 1)) * 7 + 1);
        s = rnd.toString() + s.substring(1);
        localStorage.setItem("session", s)
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
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
      this.httpClient.post<string>(`${this.baseURL}/login`, {
        "email": user.email,
        "password": user.password
      }).subscribe((data) => {
        console.log(data);
        if (!Number.isNaN(parseInt(data))) {
          //success, check for a personality
          let subscription = this.ps.getPersonalityData(parseInt(data)).subscribe({
            next: (dta) => {
              // personality found
              
              if (isPlatformBrowser(this.platformID)) {
                const rb = new Uint32Array(1);
                window.crypto.getRandomValues(rb);
                let rnd = Math.round((rb[0] / (0xffffffff + 1)) * 7 + 1);
                localStorage.setItem("session", rnd+(user.email.length * 1274321).toString());
                let encrypted = this.encr(user.email);
                localStorage.setItem("e", encrypted);
              }
              result.next(true);
              result.complete();
            },
            error: (err) => {
              // personality not found
              
              if (isPlatformBrowser(this.platformID)) {
                localStorage.setItem("session", "0"+(user.email.length * 1274321).toString());
                let encrypted = this.encr(user.email);
                localStorage.setItem("e", encrypted);
              }
              result.next(true);
              result.complete();
            }
          })
          
          return result.asObservable();
        }
        else {
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
          localStorage.setItem("session", "0"+(user.email.length * 1274321).toString());
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
