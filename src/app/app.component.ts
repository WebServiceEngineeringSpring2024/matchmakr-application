import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
// Be sure to import components above here...

@Component({
  selector: 'app-root',
  standalone: true,
  // ... and in the array here.
  imports: [RouterOutlet, PartyComponent, FriendslistComponent, SidebarComponent, LoginformComponent, SignupformComponent, ForgotformComponent, EntercodeformComponent, SearchComponent, ProfileComponent, GamesComponent, SettingsComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Matchmakr';
}
