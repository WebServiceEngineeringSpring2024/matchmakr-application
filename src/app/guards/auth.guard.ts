import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformID = inject(PLATFORM_ID);
  let token: any;
  // authorization logic just checks for if there exists a session ID or not in local storage
  // if time allows we can do a more secure auth method
  if (isPlatformBrowser(platformID)) {
    token = localStorage.getItem("session");
  }
  if (token) {
    // if the user hasnt taken the quiz
    if (token[0] == '0') {
      // redirect to quiz if not already headed there
      if (state.url.includes('quiz')) {
        return true;
      }
      else {
        alert("Personality not found. Please take the personality quiz.");
        router.navigate(['quiz']);
        return false;
      }

    }
    return true;
  }
  else {
    router.navigate(['users/login']);
    alert("Please sign in.");
    return false;
  }
};
