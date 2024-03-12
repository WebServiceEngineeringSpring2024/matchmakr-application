import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  QuizQuestions: any[];
  // Hard coding some dummy values, change later
  constructor() {
    this.QuizQuestions = [
      {
        name: "You regularly make new friends.",
        value: 0
      },
      {
        name: "You spend a lot of your free time exploring various random topics that pique your interest.",
        value: 0
      },
      {
        name: "Seeing other people cry can make you feel like you want to cry too.",
        value: 0
      },
      {
        name: "At events, you rarely introduce yourself to new people and mostly talk to your friends.",
        value: 0
      },
      {
        name: "You are more inclined to follow your head than your heart.",
        value: 0
      },
      {
        name: "You rarely worry about whether you make a good impression on everyday people you meet.",
        value: 0
      },
      {
        name: "You enjoy participating in group activities that require teamwork.",
        value: 0
      },
      {
        name: "You enjoy watching people argue, as long as you're not a part of the argument.",
        value: 0
      },
    ]
  }
}
