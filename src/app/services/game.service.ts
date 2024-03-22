import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
// Corresponds to the GameController in the backend.
export class GameService {

  private baseURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) {

  }

  // NOTE: Angular HTTP module always returns an Observable, which must be subscribed to or else nothing will happen.
  // Returns a list of all games
  getAllGames(): Observable<Game[]> {
    console.log("Get all games called: Connecting to " + this.baseURL);
    if (this.httpClient) {
      try {
        return this.httpClient.get<Game[]>(`${this.baseURL}/games`);
      } catch (err) {
        console.log("Error occurred.");
      }
      return new Observable<Game[]>();
    }
    else {
      console.log("HTTP Client is null");
      return new Observable<Game[]>();
    }
  }
  // Returns a game with the matching id
  getGame(id: number): Observable<Game> {
    try {
      return this.httpClient.get<Game>(`${this.baseURL}/games/${id}`);
    } catch (err) {
      console.log("Game " + id + " not found.");
    }
    return new Observable<Game>();
  }

  
}
