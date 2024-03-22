import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, GameListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private as: AuthService) {
  }
  isSignedIn() {
    return this.as.isUserSignedIn();
  }
  getCurrentUserEmail() {
    return this.as.getCurrentUserEmail()
  }
}
