import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";

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
  onlineFriends = [
    { name: 'John' },
    { name: 'Alice' },
    //test data before http calls
  ];

  offlineFriends = [
    { name: 'Bob' },
    { name: 'Jane' },
    //test data before http calls
  ];

}
