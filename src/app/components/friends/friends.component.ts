import { Component, Inject, OnInit } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import { FriendsService } from '../../services/friends.service';
import { Friendview } from '../../models/friendview';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import {MatDialog} from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardHeader,
    MatGridTile,
    MatCard,
    MatGridList,
    MatCardTitle,
    NgForOf,
    RouterLink
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit {
  friendsMsg: string;
  requestsMsg: string;
  onlineFriends: Friendview[];
  offlineFriends: Friendview[];
  allFriends: Friendview[];
  friendRequests: Friendview[];
  currentUserId: number;
  constructor(private router: Router, private fs: FriendsService, private as: AuthService, private dialog: MatDialog) {
    this.onlineFriends = [];
    this.offlineFriends = [];
    this.allFriends = [];
    this.friendRequests = [];
    this.friendsMsg = "Loading friends...";
    this.currentUserId = 0;
    this.requestsMsg = "Loading friend requests...";
    this.ngOnInit();
  }
  ngOnInit(): void {
    let curr = this.as.getCurrentUserEmail();
    if (!curr) {
      return;
    }
    this.as.getUserByEmail(curr).subscribe((currUser: User) => {
      this.currentUserId = currUser.id;
      // Get friends
      this.fs.getFriends(currUser.id).subscribe({
        next: (value) => {
          this.allFriends = value;
          if (this.allFriends) {
            // not null
            this.sortFriends();
            this.friendsMsg = "";
          } else {
            // null = no friends
            this.friendsMsg = "You have no friends.";
          }
          
        },
        error: (err) => {
          this.friendsMsg = err.toString();
        }
      })
      // Get friend requests
      this.fs.getFriendRequests(currUser.id).subscribe({
        next: (value) => {
          this.friendRequests = value;
          if (this.friendRequests) {
            // not null
            this.friendsMsg = "";
          } else {
            // null = no friends
            this.requestsMsg = "You have no friend requests.";
          }
        },
        error: (err) => {
          this.requestsMsg = err.toString();
        }
      })
    })
    
  }
  sortFriends() {
    this.onlineFriends = [];
    this.offlineFriends = [];
    for (let x = 0; x < this.allFriends.length; x++) {
      if (this.allFriends[x].online) {
        this.onlineFriends.push(this.allFriends[x]);
      }
      else {
        this.offlineFriends.push(this.allFriends[x]);
      }
    }
  }
  acceptRequest(id: number) {
    this.fs.acceptFriendRequest(id, this.currentUserId).subscribe((value: Boolean) => {
      if (value) {
        // display toast message?
        
      } else {
        alert("Error occurred when attempting to remove this user's friend request");
      }
    })
  }
  rejectRequest(id: number) {
    this.fs.rejectFriendRequest(id, this.currentUserId).subscribe((value: Boolean) => {
      if (value) {
        // display toast message?
        
      } else {
        alert("Error occurred when attempting to remove this user's friend request");
      }
    })
  }
  deleteFriend(id: number, username: string) {
    // modal "are you sure?" dialog
    let resp = confirm("Are you sure you want to remove " + username + " as a friend?");
    if (resp) {
      // yes
      this.fs.deleteFriend(this.currentUserId, id);
    }
  }
  viewProfile(id: number) {
    // route to profile
    this.router.navigate([`/users/${id}`]);
  }
}