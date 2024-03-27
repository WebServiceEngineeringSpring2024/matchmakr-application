import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {
  games: Game[];
  filterGames: Game[];
  query: string;
  isFiltered: boolean;
  constructor(private gss: GameService) {
    this.query = "";
    this.games = [];
    this.filterGames = [];
    this.isFiltered = false;
  }
  // Runs once the page is initialized
  ngOnInit(): void {
    this.getGames();
  }
  // Call to the game service to get a list of all games 
  private getGames() {
    this.gss.getAllGames().subscribe(data => {
      this.games = data;
    })
  }
  // Submit search query
  Submit(filter: string) {
    this.filterGames = [];
    this.isFiltered = true;
    // perform a case insensitive search on the data in the games list
    this.games.forEach(game => {
      if (game.name.toLowerCase().includes(filter.toLowerCase())) {
        this.filterGames.push(game);
      }
    });
    // if no games were found, alert user 
    if (this.filterGames.length == 0) {
      alert("No games found containing the name " + filter);
    }
  }
  Clear() {
    this.isFiltered = false;
  }
}
