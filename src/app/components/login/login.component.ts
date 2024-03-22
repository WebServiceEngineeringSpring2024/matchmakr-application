import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Usercredentials } from '../../models/usercredentials';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string;
  constructor(private as: AuthService, private router: Router) {
    this.errorMsg = "";
  }
  SubmitLogin(email: string, password: string) {
    let userCred = new Usercredentials(email, password);
    this.as.login(userCred).subscribe((data) => {
      if (data) {
        this.errorMsg = "Login successful!";  
        this.router.navigate(['games']);
      }
      else {
        this.errorMsg = "Invalid username/password.";   
      }
    });
  }
}
