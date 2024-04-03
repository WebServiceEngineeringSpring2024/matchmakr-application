import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, GameListComponent, HttpClientModule, MatToolbar, MatFormField, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string;
  draweropen: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
	this.title = "matchmakr-application";
  }
  isSignedIn() {
    return this.authService.isUserSignedIn();
  }
  getCurrentUserEmail() {
    return this.authService.getCurrentUserEmail();
  }
  goToRegister(){
    this.router.navigate(['users/register'])
  }
  goToLogin(){
    this.router.navigate(['users/login']);
  }
  goToSignout(){
    this.router.navigate(['signout'])
  }
  goToProfile(){
    this.router.navigate(['profile'])
  }
  goToGames(){
    this.router.navigate(['games'])
  }
  goToFriends(){
    this.router.navigate(['friends'])
  }

}
