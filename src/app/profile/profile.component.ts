import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  RecentGames: any[];
  constructor() {
    this.RecentGames = [
      {name: "game1"},
      {name: "game2"},
      {name: "game3"},
      {name: "game4"},
      {name: "game5"},
      {name: "game6"},
    ]
  }
}
