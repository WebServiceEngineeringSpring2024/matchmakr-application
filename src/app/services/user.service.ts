import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import BaseService from "../classes/base-service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})

export class UserService extends BaseService{

  // NOTE: Angular HTTP module always returns an Observable, which must be subscribed to or else nothing will happen.
  // Returns a list of all games
  get(id?: number): Observable<User[] | User> {
    try {
      return (typeof(id) !== 'undefined')
        ? this?.httpClient?.get<User>(`${this.baseUrl}/users/${id}`) || new Observable<User>()
        : this?.httpClient?.get<User[]>(`${this.baseUrl}/users`) || new Observable<User[]>();
    } catch (err) {
      console.log("Error occurred.");
    }
    return new Observable<User[]>();
  }
  // Returns a game with the matching id
  getFriends(id: number): Observable<Game> {
    try {
      return this.httpClient.get<Game>(`${this.baseUrl}/games/${id}`);
    } catch (err) {
      console.log("Game " + id + " not found.");
    }
    return new Observable<Game>();
  }


}
