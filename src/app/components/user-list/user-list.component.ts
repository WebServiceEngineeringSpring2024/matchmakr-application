import { Component } from '@angular/core';
import { User } from '../../models/user';
import { SearchusersService } from '../../services/searchusers.service';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {GameService} from '../../services/game.service';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {filter} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, AsyncPipe, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter, MatCard, MatTableModule, MatFormField, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: User[];
  query: string;
  isFiltered: boolean;
  searchTerm: string = '';
  filteredUsers: any[] = [];
  constructor(private sus: SearchusersService, private router: Router) {
    this.query = "";
    this.users = [];
    this.isFiltered = false;
    this.filteredUsers = [];
  }
  // Get users on initial load
  ngOnInit(): void {
    this.getUsers();
  }
  private getUsers() {
    this.sus.getAllUsers().subscribe((results: User[]) => {
      this.users = results;
      this.filteredUsers = this.users;
    });
  }
  // Submit search query
  Submit(filter: string): boolean {
    this.filteredUsers = [];
    this.isFiltered = true;
    // Do search of all users for any users with usernames that contain the filter
    this.users.forEach(user => {
      if (user.userName) {
        if (user.userName.toLowerCase().includes(filter.toLowerCase())) {
          this.filteredUsers.push(user);
        }
      }

    });
    if (this.filteredUsers.length == 0) {
      alert("No users found.");
      this.filteredUsers = this.users;
      return false;
    } else {
      return true;
    }
  }
  Clear() {
    this.isFiltered = false;
    this.filteredUsers = this.users;
  }
  ViewProfile(username: string): boolean{
    // get user with this username (from filteredusers)
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userName === username) {
        this.RedirectToProfile(this.users[i].id);
        return true;
      }
    }
    console.log("ViewProfile failed to find " + username + " in users");
    return false;
    
  }
  // redirect to user profile.
  RedirectToProfile(id: number) {
    this.router.navigate(['/users/' + id]);
  }
}
