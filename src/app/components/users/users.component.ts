import {Component, inject, model, OnInit, PLATFORM_ID} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {combineLatest, debounceTime, map, Observable, ReplaySubject} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {AsyncPipe, CommonModule, isPlatformBrowser} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {LobbyService} from "../../services/lobby.service";
import {HttpClientModule} from "@angular/common/http";
import { FriendsService } from '../../services/friends.service';
import { Friendview } from '../../models/friendview';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {consumerMarkDirty} from "@angular/core/primitives/signals";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AsyncPipe, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter, MatCard, MatTableModule, MatFormField, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private platform = inject(PLATFORM_ID);
  private ass = inject(AuthService);
  private uss = inject(UserService);
  public search = model('');
  public lass = inject(LobbyService);
  private fs = inject(FriendsService);
  private as = inject(AuthService);
  private router = inject(Router);
  buttonClicked: boolean = false;

  public maxUsers: number = 0;
  public closestUsers?: Observable<User[]>;
  public friends: Friendview[] = [];
  currentUserId: number = 0;
  users: Observable<User[]> = combineLatest([
    this.uss.get(),
    toObservable(this.search),
  ]).pipe(debounceTime(200),
    map(
      ([users, filter]: any[]) => users.filter((user: User) =>
        !filter ||
        user?.userName?.toLowerCase()?.includes(filter?.toLowerCase()))
    )
  );

  addToExistingLobby(friend: Friendview){
    // verify that user being added is in the list of friends
    for (let h = 0; h < this.friends.length; h++) {
      if (this.friends[h].id == friend.id) {
        // verify that the user being added does actually exist
        this.as.getUserByID(friend.id).subscribe((value: User) => {
          this.lass.addUser(value);
        });
        return;
      }
    }
  }



  constructor() {
    this.friends = [];
    this.currentUserId = 0;
  }
  ngOnInit(): void {
    let curr = this.as.getCurrentUserEmail();
    if (!curr) {
      return;
    }
    this.maxUsers = this.lass.maxUsers;
    // Get the ID of the current user,
    this.as.getUserByEmail(curr).subscribe((currUser: User) => {
      this.currentUserId = currUser.id;
      // Get their list of friends
      this.fs.getFriends(this.currentUserId).subscribe({
        next: (value) => {
          this.friends = value;
        },
        error: (err) => {
         console.log(err);
        }
      })
    });

    if (!isPlatformBrowser(this.platform)) return;
     const email = this.ass.decr(window?.localStorage.getItem('e')|| '');
     this.closestUsers = this.uss.getClosest(email);
     this.closestUsers.subscribe();
     console.log(email);
  }
  viewProfile(id: number) {
    this.router.navigate([`/users/${id}`]);
  }
  addToMyExistingLobby(user: User){
    this.lass.addUser(user);
  }
  addFriend(event: Event,  id: number) {
    console.log("addFriend called");
    (event.target as HTMLButtonElement).disabled = true;
    (event.target as HTMLButtonElement).textContent = "Sent...";
    // verify that user being added is not in the list of friends
    for (let h = 0; h < this.friends.length; h++) {
      if (this.friends[h].id == id) {
        alert("You are already friends with them.");
        return;
      }
    }

    // if they aren't, send friend request
    try {
      this.fs.sendFriendRequest(this.currentUserId, id).subscribe({
        next: (value) => {
          if (value) {
            // successfully added
            console.log("successfully added " + id);
          }
          else {
            // failed to add
            console.log("failed to add " + id);
          }
        }
        , error: (err) => {
          // error when adding friend
          console.log("error when adding friend")
        }
      })
    } catch {
      console.log("error when adding friend");
    }
  }
}
