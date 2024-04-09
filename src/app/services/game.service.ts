import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import BaseService from "../classes/base-service";

@Injectable({
  providedIn: 'root'
})
// Corresponds to the GameController in the backend.
export class GameService extends BaseService{

  // NOTE: Angular HTTP module always returns an Observable, which must be subscribed to or else nothing will happen.
  // Returns a list of all games
  getAllGames(): Observable<Game[]> {
    try {
      return this?.httpClient?.get<Game[]>(`${this.baseUrl}/games`) || new Observable<Game[]>();
    } catch (err) {
      console.log("Error occurred.");
    }
    return new Observable<Game[]>();
  }
  // Returns a game with the matching id
  getGame(id: number): Observable<Game> {
    try {
      return this.httpClient.get<Game>(`${this.baseUrl}/games/${id}`);
    } catch (err) {
      console.log("Game " + id + " not found.");
    }
    return new Observable<Game>();
  }


}
