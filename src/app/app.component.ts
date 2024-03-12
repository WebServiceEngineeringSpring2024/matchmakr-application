import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//import { RouterModule } from '@angular/router';
import { PartyComponent } from './party/party.component';
import { FriendslistComponent } from './friendslist/friendslist.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginformComponent } from './loginform/loginform.component';
import { SignupformComponent } from './signupform/signupform.component';
import { ForgotformComponent } from './forgotform/forgotform.component';
import { EntercodeformComponent } from './entercodeform/entercodeform.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { GamesComponent } from './games/games.component';
import { SettingsComponent } from './settings/settings.component';
import { QuizComponent } from './quiz/quiz.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
// Be sure to import components above here...

@Component({
  selector: 'app-root',
  standalone: true,
  // ... and in the array here.
  imports: [ CommonModule, RouterOutlet, PartyComponent, FriendslistComponent, SidebarComponent, LoginformComponent, SignupformComponent, ForgotformComponent, EntercodeformComponent, SearchComponent, ProfileComponent, GamesComponent, SettingsComponent, QuizComponent, PagenotfoundComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Matchmakr";
  signedIn: boolean;
  constructor() {
    this.signedIn = false;
  }
}
