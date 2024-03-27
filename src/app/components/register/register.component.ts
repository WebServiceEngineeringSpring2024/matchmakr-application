import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMsg: string;
  constructor(private as: AuthService, private router: Router) {
    this.errorMsg = "";
  }
  SubmitRegister(email: string, username: string, password: string, confirm: string) {
    // frontend logic for registration
    if (password != confirm) {
      this.errorMsg = "Passwords do not match.";
      return;
    }
    if (password.length < 6) {
      this.errorMsg = "Password length must be at least 6 characters long.";
      return;
    }
    let emailRegex = `^[^ ]{1,}@[^ ]{1,}.[^ ]{1,}$`;
    if (!(email.match(emailRegex))) {
      this.errorMsg = "Invalid email.";
      return;
    }
    // check if username is in use
    this.as.doesUserNameExist(username).subscribe((data) => {
      if (data) {
        // user already exists: give an error
        this.errorMsg = "Username " + username + " is already taken.";
        return;
      }
      else {
        // attempt to insert user
        let newUser = new User(-1, username, password, email, 0);
        this.as.register(newUser).subscribe((data) => {
          if (data) {
            // register success
            this.errorMsg = "Register success!";
            this.router.navigate(['games']);
          }
          else {
            // register failed
            this.errorMsg = "Register failed.";
          }
        }) 
      }
    });
  }
}
