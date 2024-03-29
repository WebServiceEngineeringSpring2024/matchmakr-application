import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  id: string;
  username: string;
  online: string;
  email: string;
  errorMsg: string;
  constructor(private route: ActivatedRoute, private as: AuthService) { this.id = '0'; this.online = ''; this.username = ''; this.email = ''; this.errorMsg = ''; }
  ngOnInit() {
    this.errorMsg = "Loading...";
    var param = this.route.snapshot.paramMap.get('id');
    if (!param) {
      // this is for the test cases, which can't use the params in the URL.
      param = this.id;
    }
    this.id = param;
    this.as.getUserByID(parseInt(this.id)).subscribe({
      next: (data) => {
        const user = data;
        if (!user) {
          this.errorMsg = "Internal server error";
        }
        else if (!user.userName) {
          this.errorMsg = "Internal server error";
        }
        else {
          this.errorMsg = "";
          this.username = user.userName;
          this.online = (user.online === 1 ? 'Online' : 'Offline');
          // leave in for testing
          if (this.isUserFound()) {}
        }
      },
      error: (err) => {
        this.errorMsg = "User with the ID " + this.id + " not found.";
        // leave in for testing
        if (this.isUserFound()) {}
      }
    })
  }
  isUserFound(): Boolean {
    if (this.username != '') {
      return true;
    }
    return false;
  }
}
