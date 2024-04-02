import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Usercredentials } from '../../models/usercredentials';
import { Router } from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatToolbar,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMsg: string;
  loginForm: FormGroup;


  constructor(private as: AuthService, private router: Router) {
    this.errorMsg = "";
    this.loginForm = new FormGroup( {
      email: new FormControl( '',[Validators.required, Validators.email]),
      password: new FormControl( '', Validators.required),
    });
  }

  goToRegister(){
    this.router.navigate(['users/register'])
  }

  SubmitLogin() {
    let userCred = this.loginForm.getRawValue() as Usercredentials;
    this.as.login(userCred).subscribe((data) => {
      if (data) {
        this.errorMsg = "Login successful!";
        this.router.navigate(['games']);
      }
      else {
        this.errorMsg = "Invalid username/password.";
        document.getElementById('email',)
      }
    });
  }
}
