import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForOf} from "@angular/common";
import { AuthService } from '../../services/auth.service';
import { FriendsService } from '../../services/friends.service';
import { Friendview } from '../../models/friendview';
import { User } from '../../models/user';
import { NgIf } from '@angular/common';
import { PersonalityService } from '../../services/personality.service';
import { Personality } from '../../models/personality';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  id: string;
  username: string;
  online: string;
  showAdditional: boolean;
  email: string;
  personality: string;
  errorMsg: string;
  friendsMsg: string;
  friendRequests: Friendview[];
  friendStatus = "";
  currentUserEmail = "";
  currentUserId = -1;
  friendsList: Friendview[];
  router = inject(Router);
  constructor(private route: ActivatedRoute, private as: AuthService, private ps: PersonalityService, private fs: FriendsService) { this.id = '0'; this.online = ''; this.showAdditional = false; this.username = 'Loading username...'; this.email = ''; this.friendsMsg = 'Loading friends...'; this.errorMsg = ''; this.personality = ''; this.friendsList = []; this.friendRequests = []; }
  ngOnInit() {
    this.errorMsg = "Loading...";
    var param = this.route.snapshot.paramMap.get('id');
    if (!param) {
      // this is for the test cases, which can't use the params in the URL.
      param = this.id;
    }
    this.id = param;
    this.as.getUserByID(parseInt(this.id)).subscribe({
      next: (data) => {
        const user = data;
        if (!user) {
          this.errorMsg = "Internal server error";
        }
        else if (!user.userName) {
          this.errorMsg = "Internal server error";
        }
        else {
          // user found, set data
          this.errorMsg = "";
          this.username = user.userName;
          this.online = user.online ? 'Online' : 'Offline';

          // set friends
          this.fs.getFriends(parseInt(this.id)).subscribe((data: Friendview[]) => {
            this.friendsList = data;
            if (this.friendsList) {
              // not null, not empty
              this.friendsMsg = "";
            } else {
              // null, empty
              this.friendsMsg = "No friends found.";
            }
          })
          // extra data to show if current user is viewing their own profile
          this.currentUserEmail = "" + this.as.getCurrentUserEmail();
          // There should be a current user signed in, if there isn't then stop
          if (this.currentUserEmail == "null" || !this.currentUserEmail) {
            return;
          }
          if (user.email == this.currentUserEmail) {
            this.showAdditional = true;
            this.email = user.email;
            this.personality = 'Loading personality...';
            this.ps.getPersonalityData(parseInt(this.id)).subscribe((value: Personality) => {
              if (value) {
                if (value.id) {
                  this.personality = `Personality: ${this.ps.getAdjectives(value)}`;
                }
              } else {
                this.personality = `Personality is missing.`;
              }
            })
          }
          // current user is looking at a profile other than their own, display option to add friend/remove friend
          else {
            // get current user ID
            this.as.getUserByEmail(this.currentUserEmail).subscribe((value: User) => {
              this.currentUserId = value.id;
              // if current user isn't in list of friends
              let notFriends = true;
              if (this.friendsList) {
                for (let j = 0; j < this.friendsList.length; j++) {
                  if (this.friendsList[j].id == this.currentUserId) {
                    notFriends = false;
                  }
                }
              }
              if (notFriends) {
                // check if this user has sent friend request to current user
                this.fs.getFriendRequests(this.currentUserId).subscribe({
                  next: (value) => {
                    if (value) {
                      // current user has pending friend requests, see if this user is one of them
                      for (let q = 0; q < value.length; q++) {
                        if (value[q].id == parseInt(this.id)) {
                          // this user is one of them, present option to accept friend request
                          this.friendStatus = "pending";
                        }
                      }
                    } else {
                      // current user has no pending friend requests, investigate further
                      this.findFriendStatus();
                    }
                  },
                  error: (err) => {
                    // error occurred trying to get friend requests
                  }
                })
              } else {
                // else (they are friends)
                this.friendStatus = "accepted";
              }
            })
          }
          // leave in for testing
          if (this.isUserFound()) {}
        }
      },
      error: (err) => {
        this.errorMsg = "User with the ID " + this.id + " not found.";
        // leave in for testing
        if (this.isUserFound()) {}
      }
    })
  }
  isUserFound(): Boolean {
    if (this.username != '') {
      return true;
    }
    return false;
  }
  removeFriend() {
    // verify if this user is friends with current user
    let notFriends = true;
    for (let j = 0; j < this.friendsList.length; j++) {
      if (this.friendsList[j].id == this.currentUserId) {
        notFriends = false;
        break;
      }
    }
    if (notFriends) {
      // you aren't friends, you can't "remove friend"
      return;
    }
    // confirm removing friend
    if (confirm("Are you sure you want to remove " + this.username + " as a friend?")) {
      // if yes, remove friend, redirect to users
      this.fs.deleteFriend(parseInt(this.id), this.currentUserId);
      this.router.navigate(['users']);
    }

  }
  sendFriendRequest() {
    let noRequest = true;
    for (let g = 0; g < this.friendRequests.length; g++) {
      if (this.friendRequests[g].id == this.currentUserId) {
        noRequest = false;
      }
    }
    // if current user is not in the list,
    if (noRequest) {
      // send request
      this.fs.sendFriendRequest(this.currentUserId, parseInt(this.id) );

    }
      else {
        alert("You already sent a friend request to this person.");
      }
  }
  acceptFriendRequest() {
    this.fs.acceptFriendRequest(parseInt(this.id), this.currentUserId);
  }
  findFriendStatus () {
    // must be browser side
    if (this.currentUserEmail && this.currentUserEmail != "null") {

    } else { return; };
    // get list of friend requests
    this.fs.getFriendRequests(parseInt(this.id)).subscribe({
      next: (value) => {
        if (value) {
          // set friendRequests to this (to be used if user tries to send friend request)
          this.friendRequests = value;
          // user has friend requests pending, check if current user is one of them
          for (let k = 0; k < value.length; k++) {
            if (value[k].id == this.currentUserId) {
              // yes (current user has sent a friend request already)
              this.friendStatus = "sent";
            }
          }
          // if friendStatus is not "sent"
          if (this.friendStatus != "sent") {
            // then friend status is none (not friends, no friend request sent)
            this.friendStatus = "none";
          }
        } else {
          // no friend requests either. status is none
            this.friendStatus = "none";
        }
      },
      error(err)  {
          // error occurred trying to get friend requests
          console.log("error occurred trying to get friend requests");
      }
    })
  }
}
