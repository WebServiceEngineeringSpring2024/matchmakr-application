import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import BaseService from "../classes/base-service";
import {User} from "../models/user";
import {UserFriend} from "../models/friend";

@Injectable({
  providedIn: 'root'
})

export class UserService extends BaseService{
  getClosest(email: string): Observable<User[]> {
    return this?.httpClient?.get<User[]>(`${this.baseUrl}/lobbies/matchUser/${email}`) || new Observable<User[]>();
  }

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
  getFriends(id: number): Observable<UserFriend> {
    try {
      return this.httpClient.get<UserFriend>(`${this.baseUrl}/users/${id}/friends`);
    } catch (err) {
      console.log("Friends " + id + " not found.");
    }
    return new Observable<UserFriend>();
  }


}
