import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Usercredentials } from "../../models/usercredentials";
import { UserRegister } from "../../models/userregister.model";
import { MatError } from "@angular/material/form-field";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatError],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMsg: string;
  registerForm: FormGroup;
  constructor(private as: AuthService, private router: Router) {
    this.errorMsg = "";
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
  SubmitRegister() {
    let userRegister = this.registerForm.getRawValue() as UserRegister;
    // frontend logic for registration
    if (userRegister.password != userRegister.confirmPassword) {
      this.errorMsg = "Passwords do not match.";
      return;
    }
    if (userRegister.password.length < 6) {
      this.errorMsg = "Password length must be at least 6 characters long.";
      return;
    }
    let emailRegex = `^[^ ]{1,}@[^ ]{1,}.[^ ]{1,}$`;
    if (!(userRegister.email.match(emailRegex))) {
      this.errorMsg = "Invalid email.";
      return;
    }
    // check if username is in use
    this.as.doesUserNameExist(userRegister.userName).subscribe((data) => {
      if (data) {
        // user already exists: give an error
        this.errorMsg = "Username " + userRegister.userName + " is already taken.";
        return;
      }
      else {
        // attempt to insert user
        let newUser = new User(-1, userRegister.userName, userRegister.password, userRegister.email, false, 0);
        this.as.register(newUser).subscribe((data) => {
          if (data) {
            // register success
            this.errorMsg = "Register success!";
            this.router.navigate(['quiz']);
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
