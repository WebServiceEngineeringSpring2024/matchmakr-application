import {Component, inject, model, OnInit, PLATFORM_ID} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {combineLatest, debounceTime, map, Observable, tap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {AsyncPipe, CommonModule, isPlatformBrowser} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {LobbyService} from "../../services/lobby.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AsyncPipe, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter, MatCard, MatTableModule, MatFormField, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  private platform = inject(PLATFORM_ID);
private ass = inject(AuthService);
  private uss = inject(UserService);
  public search = model('');
  public lass = inject(LobbyService);
  public closestUsers?: Observable<User[]>;
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
  ngOnInit() {
    if (!isPlatformBrowser(this.platform)) return;
     const email = this.ass.decr(window?.localStorage.getItem('e')|| '');
     this.closestUsers = this.uss.getClosest(email).pipe(tap((deez)=>console.log(deez)));
     this.closestUsers.subscribe();
     console.log(email);
  }
}
