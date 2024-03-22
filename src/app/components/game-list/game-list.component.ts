import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {
  games: Game[];
  query: string;
  constructor(private gss: GameService) {
    this.query = "";
    this.games = [];
  }
  ngOnInit(): void {
    this.getGames();
  }
  private getGames() {
    this.gss.getAllGames().subscribe(data => {
      this.games = data;
    })
  }
  Submit(filter: string) {
    alert(filter);
  }
}
