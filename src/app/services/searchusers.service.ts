import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SearchusersService {

  private baseURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    if (this.httpClient) {
      try {
        return this.httpClient.get<User[]>(`${this.baseURL}/users`);
      } catch (err) {
        console.log("Error occurred attempting to get all users");
      }
      return new Observable<User[]>();
    }
    else {
      // return empty array if httpClient is null
      console.log("HTTP Client is null")
      return new Observable<User[]>();
    }
    
  }
}
