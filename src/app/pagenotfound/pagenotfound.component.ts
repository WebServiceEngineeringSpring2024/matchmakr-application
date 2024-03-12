import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  standalone: true,
  imports: [],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PagenotfoundComponent {
  constructor() {
    console.log("f");
  }
  count = 0;
  @HostListener('window:click', ['$event'])
  test(event: Event) {
    this.count ++;
    console.log(event);
  }
  keyPress() {
    console.log("key pressed");
  }
}
