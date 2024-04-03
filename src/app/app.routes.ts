import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { authGuard } from './guards/auth.guard';
import { signoutGuard}  from './guards/signout.guard';
import { QuizComponent } from './components/quiz/quiz.component';
import { quizGuard } from './guards/quiz.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { currentUserViewGuard } from './guards/current-user-view.guard';
import {FriendsComponent} from "./components/friends/friends.component";
import {UsersComponent} from "./components/users/users.component";

// routes for the web app go here
export const routes: Routes = [
    { path: 'users/login', component: LoginComponent },
    { path: 'users/register', component: RegisterComponent },
    { path: 'games', component: GameListComponent, canActivate: [authGuard] },
    { path: 'signout', component: LoginComponent, canActivate: [signoutGuard]},
    { path: 'quiz', component: QuizComponent, canActivate: [quizGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [currentUserViewGuard]},
  {path: 'users/search', component: UsersComponent},
  { path: 'users/:id', component: ProfileComponent, data: {id: 0} },
  { path: 'friends', component: FriendsComponent},
];
