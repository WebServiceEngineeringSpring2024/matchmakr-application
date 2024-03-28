import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const quizGuard: CanActivateFn = (route, state) => {
  // if no user is signed in, redirect to login page and return false
  const router = inject(Router);
  const platformID = inject(PLATFORM_ID);
  let token: any;
  if (isPlatformBrowser(platformID)) {
    token = localStorage.getItem("session");
  }
  if (!token) {
    router.navigate(['users/login']);
    alert("Please sign in.");
    return false;
  }
  // otherwise, if user has taken quiz, redirect to games page and return false
  // TODO: endpoint for getting quiz data, no result found = quiz not taken
  // otherwise, return true
  return true;
};
