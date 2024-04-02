import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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
}
