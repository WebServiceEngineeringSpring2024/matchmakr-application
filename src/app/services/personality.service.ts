import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Personality } from '../models/personality';

@Injectable({
  providedIn: 'root'
})
export class PersonalityService {
  private baseURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) { }
  
  postPersonalityData(email: string, aggression: number, kindness: number, competitiveness: number): Observable<boolean> {
    const result = new Subject<boolean>();
    // verify that id is truthy
    if (!email) {
      result.next(false);
      result.complete();
      return result.asObservable();
    }
    // verify that all scores are truthy
    if (!(aggression && kindness && competitiveness)) {
      result.next(false);
      result.complete();
      return result.asObservable();
    }
    // verify that all scores are positive
    if (!(aggression > 0 && kindness > 0 && competitiveness > 0)) {
      result.next(false);
      result.complete();
      return result.asObservable();
    }
    // verify that all scores are not too large
    if (!(aggression < 100 && kindness < 100 && competitiveness < 100)) {
      result.next(false);
      result.complete();
      return result.asObservable();
    }
    // make post request
    if (this.httpClient) {
      // We can change the format of the JSON body as needed
      this.httpClient.post(`${this.baseURL}/personalities/insert`, {
        "email": email,
        "aggression": aggression,
        "kindness": kindness,
        "competitiveness": competitiveness
      }).subscribe({
        next: () => {
          // success
          result.next(true);
          result.complete();      
          return result.asObservable();
        },
        error: () => {
          // error
          result.next(false);
          result.complete();      
          return result.asObservable();
        }
      })
    }
    else {
      console.log("HTTP Client is null");
      result.next(false);
      result.complete();
    }
    return result.asObservable();
  }
  getPersonalityData(id: number) : Observable<Personality> {
    if (this.httpClient) {
      // get request
      return this.httpClient.get<Personality>(`${this.baseURL}/personalities/id/${id}`);
    }
    else {
      return new Observable<Personality>();
    }
  }
  getAdjectives(p: Personality) : string {
    let adj = "";
    let aggro = p.aggression;
    switch (true) {
      case (aggro < 3):
        adj += "Patient, ";
        break;
      case (aggro < 6):
        adj += "Tolerant, ";
        break;
      case (aggro < 9):
        adj += "Composed, ";
        break;
      case (aggro < 12):
        adj += "Combative, ";
        break;
      case (aggro == 12):
        adj += "Militant, "
        break;
    }
    let comp = p.competitiveness;
    switch (true) {
      case (comp < 3):
        adj += "Friendly, ";
        break;
      case (comp < 6):
        adj += "Casual, ";
        break;
      case (comp < 9):
        adj += "Balanced, ";
        break;
      case (comp < 12):
        adj += "Competitive, ";
        break;
      case (comp == 12):
        adj += "Hyper-competitive, "
        break;
    }
    let kind = p.kindness;
    switch (true) {
      case (kind < 3):
        adj += "Ruthless ";
        break;
      case (kind < 6):
        adj += "Determined ";
        break;
      case (kind < 9):
        adj += "Compassionate ";
        break;
      case (kind < 12):
        adj += "Altruistic ";
        break;
      case (kind == 12):
        adj += "Gracious "
        break;
    }
    return adj;
  }
}
