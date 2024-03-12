import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signupform',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signupform.component.html',
  styleUrl: './signupform.component.css'
})
export class SignupformComponent {
  email: string;
  password: string;
  confirm: string;
  errorMsg: string;
  showErrorMsg: boolean;
  passwordUnmask: boolean;
  constructor() {
    this.email = "";
    this.password = "";
    this.confirm = "";
    this.showErrorMsg = false;
    this.errorMsg = "";
    this.passwordUnmask = false;
  }
  onSignUpClick() : void {
    // small setup stuff
    this.passwordUnmask = false;
    this.showErrorMsg = false;
    // validation
    if (this.password != this.confirm) {
      this.errorMsg = "Passwords do not match.";
      this.showErrorMsg = true;
      return;
    }
    if (this.password == "") {
      this.errorMsg = "Password missing.";
      this.showErrorMsg = true;
      return;
    }
    if (this.email == "") {
      this.errorMsg = "Email missing.";
      this.showErrorMsg = true;
      return;
    }
      // method calls to:
      //* validate email w/ a regex
      //* validate password reqs w/ a regex
      //* check if user already exists in db?
  }
  onUnmaskClick() : void {
    this.passwordUnmask = !this.passwordUnmask;
  }
}
