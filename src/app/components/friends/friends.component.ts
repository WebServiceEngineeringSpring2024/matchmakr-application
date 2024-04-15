import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {User} from "../../models/user";
import {LobbyService} from "../../services/lobby.service";

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
    NgForOf
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  public lass = inject(LobbyService);
  onlineFriends = [
    { name: 'sronchetti4@uiuc.edu' },
    { name: 'tbenef@bluehost.com' },
    {name: 'rborrell18@tamu.edu'}
    //test data before http calls
  ];

  offlineFriends = [
    { name: 'ktraskej@tmall.com' },
    { name: 'cofarris14@miitbeian.gov.cn' },
    {name: 'gkeeler1d@icio.us'}
    //test data before http calls
  ];
addToExistingLobby(friend: string){
  const newUser = new User(0 , '', '', friend, 1, 0);
  this.lass.addUser(newUser);
}
}
