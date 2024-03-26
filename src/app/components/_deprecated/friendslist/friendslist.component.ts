import { Component } from '@angular/core';
import { FriendComponent } from '../friend/friend.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friendslist',
  standalone: true,
  imports: [FriendComponent, CommonModule],
  templateUrl: './friendslist.component.html',
  styleUrl: './friendslist.component.css'
})
export class FriendslistComponent {
  OnlineFriends: any[];
  OfflineFriends: any[];
  // Hard coding some dummy values, change later
  constructor() {
    this.OnlineFriends = [
      {
        name: "joe"
      },
      {
        name: "bob"
      }
    ]
    this.OfflineFriends = [
      {
        name: "ernie"
      },
    ]
  }
}
