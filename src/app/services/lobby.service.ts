import {Injectable, inject, PLATFORM_ID, signal, } from '@angular/core';
import {User} from "../models/user";
import {Game} from "../models/game";
import {AuthService} from "./auth.service";
import {Friendview} from "../models/friendview";

type Lobby = {
  game: Game;
  users: User[];
}
@Injectable({
  providedIn: 'root'
})

export class LobbyService {
  maxUsers: number = 0;
  private authService = inject(AuthService);
  public lobby = signal<Lobby | null>(null);
  public addUser(user: User){
    const lobby = this.lobby();
    if(!lobby) return;
    if(lobby.users.length >= this.maxUsers){
      alert('Maximum Amount of Users In Lobby!');
      return;
    }
    this.checkUsers();
    lobby.users.push(user);
    this.lobby.set(lobby);
  }

  public hasUser(user: User | Friendview): boolean {
    const lobby = this.lobby();
    if (!lobby) return false;
    return lobby.users?.filter((lobbyUser: User) => lobbyUser.id === user.id)?.length > 0;
  }

  public createLobby(game: Game, maxUsers: number){
    const currentUser = this.authService.getCurrentUserEmail();
    this.maxUsers = maxUsers;
    if(!currentUser) return;
    const newUser = new User(0 , '', '', currentUser, true, 0);
    this.lobby.set({
      game,
      users: [newUser]
    });
  }
  public checkUsers(){
    console.log(this.maxUsers);
  }
}
