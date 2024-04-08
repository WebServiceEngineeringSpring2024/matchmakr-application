import {Component, inject, model, OnInit} from '@angular/core';
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
import {MatButtonModule} from "@angular/material/button";
import {BehaviorSubject, combineLatest, map, Observable, ReplaySubject, tap, withLatestFrom} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {AuthService} from "../../services/auth.service";
import {LobbyService} from "../../services/lobby.service";

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, AsyncPipe, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter, MatCard, MatTableModule, MatFormField, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  private gss = inject(GameService);
  private lass = inject(LobbyService);
  public search = model('');
  games: Observable<Game[]> = combineLatest([
    this.gss.getAllGames(),
    toObservable(this.search),
  ]).pipe(
    map(
      ([games, filter]: any[]) => games.filter((game: Game) =>
        filter.length === 0 ||
        game.name.toLowerCase().includes(filter.toLowerCase()))
    )
  );
  addToLobby(game: Game){
    this.lass.createLobby(game);
  }

}
