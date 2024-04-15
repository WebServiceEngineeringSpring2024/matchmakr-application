import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Friendview } from '../models/friendview';
import { AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private baseURL = "http://localhost:8080/friends";
  constructor(private httpClient: HttpClient, private as: AuthService) { }

  // check two users with id1 and id2 if friends
  checkIfFriends(id1: number, id2: number) : Observable<Boolean> {
    let r = new Observable<Boolean>;
    let friends: Friendview[];
    this.getFriends(id1).subscribe(data => {
      friends = data;
      let found = false;
      for (let x = 0; x < friends.length; x++) {
        if (friends[x].id == id2) {
          // friend found
          found = true;
          const result = new Subject<Boolean>();
          result.next(true);
          result.complete();
          r = result.asObservable();
        } 
      }
      if (found == false) {
        const result = new Subject<Boolean>();
          result.next(false);
          result.complete();
          r = result.asObservable();
      }
    })
    return r;
  }

  // get friends (/{id})
  getFriends(id: number) : Observable<Friendview[]> {
    // verify that httpClient is not null
    if (!this.httpClient) {
      const badresult = new Subject<Friendview[]>();
      return badresult.asObservable();
    }
    try {
      return this.httpClient.get<Friendview[]>(`${this.baseURL}/${id}`);
    } catch (err) {
      console.log("ERROR when getting friends");
      const badresult = new Subject<Friendview[]>();
      return badresult.asObservable();
    }
  }

  // post friend request (/request) {userfriend}
  sendFriendRequest(senderId: number, receiverId: number) : Observable<boolean> {
    const result = new Subject<boolean>();
    // verify that httpClient is not null
    if (!this.httpClient) {
      result.next(false);
      result.complete();
      return result.asObservable();
    }
    try {
      this.httpClient.post<Friendview[]>(`${this.baseURL}/request`, {
        "user": senderId,
        "friend": receiverId,
        "accepted": 0,
        "created": null,
        "updated": null
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
    } catch (err) {
      result.next(false);
      result.complete();
      return result.asObservable();
    }
    return result.asObservable();
  }
  sendFriendRequestByEmail(senderEmail: string, receiverId: number) : Observable<boolean> {
    const result = new Subject<boolean>();
    // get id from email
    this.as.getUserByEmail(senderEmail).subscribe({
      next: (value) => {
        return this.sendFriendRequest(value.id, receiverId);
      },
      error: (err) => {
        console.log(err);
        result.next(false);
        result.complete();
      }
    })
    return result.asObservable();
  }

  // get friend requests (/{id})
  getFriendRequests(receiverId: number) : Observable<Friendview[]> {
    // verify that httpClient is not null
    if (!this.httpClient) {
      const badresult = new Subject<Friendview[]>();
      return badresult.asObservable();
    }
    try {
      return this.httpClient.get<Friendview[]>(`${this.baseURL}/incoming/${receiverId}`);
    } catch (err) {
      console.log("ERROR when getting friends");
      const badresult = new Subject<Friendview[]>();
      return badresult.asObservable();
    }
  }

  // delete friend request (/reject/{senderId}/{receiverId})
  rejectFriendRequest(senderId: number, receiverId: number) : Observable<Boolean> {
    let r = new Observable<Boolean>();
    // verify that httpClient is not null
    if (!this.httpClient) {
      const badresult = new Subject<Boolean>();
      badresult.next(false);
      badresult.complete();
      return badresult.asObservable();
    }
    try {
      this.httpClient.delete(`${this.baseURL}/reject/${senderId}/${receiverId}`).subscribe({
        next: () => {
          const result = new Subject<Boolean>();
          result.next(true);
          result.complete();
          r = result.asObservable();
        },
        error: (err) => {
          console.log(err);
          const badresult = new Subject<Boolean>();
          badresult.next(false);
          badresult.complete();
          r = badresult.asObservable();
        }
      })
    } catch (err) {
      console.log(err);
      const badresult = new Subject<Boolean>();
      badresult.next(false);
      badresult.complete();
      r = badresult.asObservable();
    }
    return r;
  }

  rejectFriendRequestByEmail(senderId: number, receiverEmail: string) : Observable<Boolean> {
    let r = new Observable<Boolean>();
    this.as.getUserByEmail(receiverEmail).subscribe({
      next: (value) => {
        r = this.rejectFriendRequest(senderId, value.id);
      },
      error: (err) => {
        console.log(err);
        const result = new Subject<Boolean>();
        result.next(false);
        result.complete();
        r = result.asObservable();
      }
    })
    return r;
  }
  
  // put accept friend request (/accept) {userfriend}
  acceptFriendRequest(senderId: number, receiverId: number) : Observable<Boolean> {
    let r = new Observable<Boolean>();
    // verify that httpClient is not null
    if (!this.httpClient) {
      const badresult = new Subject<Boolean>();
      badresult.next(false);
      badresult.complete();
      return badresult.asObservable();
    }
    try {
      this.httpClient.put(`${this.baseURL}/accept`, {
        "user": senderId,
        "friend": receiverId,
        "accepted": 0,
        "created": null,
        "updated": null
      }).subscribe({
        next: () => {
          const result = new Subject<Boolean>();
          result.next(true);
          result.complete();
          r = result.asObservable();
        },
        error: (err) => {
          console.log(err);
          const badresult = new Subject<Boolean>();
          badresult.next(false);
          badresult.complete();
          r = badresult.asObservable();
        }
      })
    } catch (err) {
      console.log(err);
      const badresult = new Subject<Boolean>();
      badresult.next(false);
      badresult.complete();
      r = badresult.asObservable();
    }
    return r;
  }

  acceptFriendRequestByEmail(senderId: number, receiverEmail: string) : Observable<Boolean> {
    let r = new Observable<Boolean>();
    this.as.getUserByEmail(receiverEmail).subscribe({
      next: (value) => {
        r = this.acceptFriendRequest(senderId, value.id);
      },
      error: (err) => {
        console.log(err);
        const result = new Subject<Boolean>();
        result.next(false);
        result.complete();
        r = result.asObservable();
      }
    })
    return r;
  }

  // delete friend (/remove/{userID}/{userID2})
  deleteFriend(userId: number, otherId: number) : Observable<Boolean> {
    let r = new Observable<Boolean>();
    // verify that httpClient is not null
    if (!this.httpClient) {
      const badresult = new Subject<Boolean>();
      badresult.next(false);
      badresult.complete();
      return badresult.asObservable();
    }
    try {
      this.httpClient.delete(`${this.baseURL}/remove/${userId}/${otherId}`).subscribe({
        next: () => {
          const result = new Subject<Boolean>();
          result.next(true);
          result.complete();
          r = result.asObservable();
        },
        error: (err) => {
          console.log(err);
          const badresult = new Subject<Boolean>();
          badresult.next(false);
          badresult.complete();
          r = badresult.asObservable();
        }
      })
    } catch (err) {
      console.log(err);
      const badresult = new Subject<Boolean>();
      badresult.next(false);
      badresult.complete();
      r = badresult.asObservable();
    }
    return r;
  }

  deleteFriendByEmail(userId: number, otherUser: string) : Observable<Boolean> {
    let r = new Observable<Boolean>();
    this.as.getUserByEmail(otherUser).subscribe({
      next: (value) => {
        r = this.rejectFriendRequest(userId, value.id);
      },
      error: (err) => {
        console.log(err);
        const result = new Subject<Boolean>();
        result.next(false);
        result.complete();
        r = result.asObservable();
      }
    })
    return r;
  }
}
