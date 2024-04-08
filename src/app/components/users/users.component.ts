import {Component, inject, model} from '@angular/core';
import {MatFormField, MatFormFieldControl, MatLabel} from "@angular/material/form-field";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {GameService} from "../../services/game.service";
import {combineLatest, debounce, debounceTime, map, Observable, tap} from "rxjs";
import {Game} from "../../models/game";
import {toObservable} from "@angular/core/rxjs-interop";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {AsyncPipe, CommonModule, NgFor, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {LobbyService} from "../../services/lobby.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, AsyncPipe, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter, MatCard, MatTableModule, MatFormField, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private uss = inject(UserService);
  public search = model('');
  private lass = inject(LobbyService);
  buttonClicked: boolean = false;
  users: Observable<User[]> = combineLatest([
    this.uss.get(),
    toObservable(this.search),
  ]).pipe(debounceTime(200),
    map(
      ([users, filter]: any[]) => users.filter((user: User) =>
        !filter ||
        user?.userName?.toLowerCase()?.includes(filter?.toLowerCase()))
    )
  );
  addToExistingLobby(user: User){
    this.lass.addUser(user);
  }
}
