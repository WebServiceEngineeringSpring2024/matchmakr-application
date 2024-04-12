import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  friendsList: Friendview[];
  constructor(private route: ActivatedRoute, private as: AuthService, private ps: PersonalityService, private fs: FriendsService) { this.id = '0'; this.online = ''; this.showAdditional = false; this.username = 'Loading username...'; this.email = ''; this.friendsMsg = 'Loading friends...'; this.errorMsg = ''; this.personality = ''; this.friendsList = []; }
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
          this.online = (user.online === 1 ? 'Online' : 'Offline');

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
          if (user.email == this.as.getCurrentUserEmail()) {
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
}
