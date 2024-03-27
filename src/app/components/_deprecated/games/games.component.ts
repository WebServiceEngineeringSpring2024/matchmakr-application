import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  FavGames: any[];
  RecommendGames: any[];
  // Hard coding some dummy values, change later
  constructor() {
    this.FavGames = [
      {
        name: "game1"
      },
      {
        name: "game2"
      },
      {
        name: "game3"
      },
      {
        name: "game4"
      },
      {
        name: "game5"
      },
    ]
    this.RecommendGames = [
      {
        name: "gameX"
      },
      {
        name: "gameY"
      },
      {
        name: "gameZ"
      },
    ]
  }
}
