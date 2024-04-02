import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {GameService} from '../../services/game.service';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {filter} from "rxjs";

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, AsyncPipe, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter, MatCard, MatTableModule, MatFormField, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent implements OnInit {
  games: Game[];
  query: string;
  isFiltered: boolean;
  searchTerm: string = '';
  filteredGames: any[] = [];
  constructor(private gss: GameService) {
    this.query = "";
    this.games = [];
    this.filteredGames = [];
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
      this.filteredGames = data;
    })
  }
  // Submit search query
  Submit(filter: string) {
    this.filteredGames = [];
    this.isFiltered = true;
    // perform a case insensitive search on the data in the games list
    this.games.forEach(game => {
      if (game.name.toLowerCase().includes(filter.toLowerCase())) {
        this.filteredGames.push(game);
      }
    });
    // if no games were found, alert user
    if (this.filteredGames.length == 0) {
      alert("No games found containing the name " + filter);
      this.filteredGames = this.games;
    }
  }
  Clear() {
    this.isFiltered = false;
    this.filteredGames = this.games;
  }
}
