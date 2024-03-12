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
{ path: 'login', component: LoginformComponent, data:{requiresLogin: true}  },
{ path: 'signup', component: SignupformComponent },
{ path: 'forgot', component: ForgotformComponent },
{ path: 'enter', component: EntercodeformComponent },
{ path: 'quiz', component: QuizComponent },

// signed in
{ path: 'search', component: SearchComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'games', component: GamesComponent },
{ path: 'settings', component: SettingsComponent },

// "any other link" results in a 404 (This should be placed last)
{ path: '**', component: PagenotfoundComponent }
];

