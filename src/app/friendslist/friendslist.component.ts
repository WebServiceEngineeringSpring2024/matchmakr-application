import { Component } from '@angular/core';
import { FriendComponent } from '../friend/friend.component';

@Component({
  selector: 'app-friendslist',
  standalone: true,
  imports: [FriendComponent],
  templateUrl: './friendslist.component.html',
  styleUrl: './friendslist.component.css'
})
export class FriendslistComponent {

}
