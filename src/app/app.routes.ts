import { Routes } from '@angular/router';
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
import { AppComponent } from './app.component';

import { ResolveFn } from '@angular/router';

export const routes: Routes = [
    // signed out & signing up
{ path: 'login', title: 'Matchmakr', component: LoginformComponent, data:{requiresLogin: true}  },
{ path: 'signup', title: 'Matchmakr', component: SignupformComponent },
{ path: 'forgot', title: 'Matchmakr', component: ForgotformComponent },
{ path: 'enter', title: 'Matchmakr', component: EntercodeformComponent },
{ path: 'quiz', title: 'Matchmakr', component: QuizComponent },

// signed in
{ path: 'search', title: 'Matchmakr', component: SearchComponent },
{ path: 'profile', title: 'Matchmakr', component: ProfileComponent },
{ path: 'games', title: 'Matchmakr', component: GamesComponent },
{ path: 'settings', title: 'Matchmakr', component: SettingsComponent },

// "any other link" results in a 404 (This should be placed last)
{ path: '**', title: 'Matchmakr', component: PagenotfoundComponent }
];

