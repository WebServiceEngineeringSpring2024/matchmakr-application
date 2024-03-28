import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalityService } from '../../services/personality.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  formData = {
    q1data: '',
    q2data: '',
    q3data: '',
    q4data: '',
    q5data: '',
    q6data: '',
    q7data: '',
    q8data: '',
    q9data: ''
  };
  errorMsg = '';
  options = ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'];

  constructor(private formBuilder: FormBuilder, private router: Router, private ps: PersonalityService, private as: AuthService) {}

  submitForm() {
    // If no user is signed in
    if (!this.as.getCurrentUserEmail()) {
      this.router.navigate(['login']);
    }
    this.errorMsg = '';
    // If any fields are missing, return
    if (this.formData.q1data === '' || this.formData.q2data === '' || this.formData.q3data === '' || this.formData.q4data === '' || this.formData.q5data === '' || this.formData.q6data === '' || this.formData.q7data === '' || this.formData.q8data === '' || this.formData.q9data === '' ) {
      this.errorMsg = "Please answer all questions."
      return;
    }
    // Convert the quiz data into five scores
    // q1 = aggression, q2 = competitiveness, q3 = kindness, q4 = competitivenes, q5 = aggression, q6 = competitiveness, q7 = aggression, q8 = kindness, q9 = kindness
    let kindness = 0, aggression = 0, competitivenes = 0;
    kindness += this.optionEnum(this.formData.q3data) + this.optionEnum(this.formData.q8data) + this.optionEnum(this.formData.q9data);
    aggression += this.optionEnum(this.formData.q1data) + this.optionEnum(this.formData.q5data) + this.optionEnum(this.formData.q7data);
    competitivenes += this.optionEnum(this.formData.q2data) + this.optionEnum(this.formData.q4data) + this.optionEnum(this.formData.q6data);
    alert(`TODO: add endpoint to receive personality data\nYour scores are: kindness=${kindness} aggression=${aggression} competitiveness=${competitivenes}`);
    let email = "" + this.as.getCurrentUserEmail(); // We verified above that the email is not null, this is acceptable
    this.ps.postPersonalityData(email, aggression, kindness, competitivenes).subscribe((data) => {
      if (data) {
        // success
        this.router.navigate(['games']);
      }
      else {
        // invalid
        this.errorMsg = "Your personality data already exists, or an internal server error occurred.";
      }
    });
  }
  optionEnum(choice: string) : number {
    switch (choice) {
      case 'Strongly Disagree':
        return 1;
      case 'Disagree':
        return 2;
      case 'Agree':
        return 3;
      case 'Strongly Agree':
        return 4;
      default:
        return 0;
    }
  }
}
