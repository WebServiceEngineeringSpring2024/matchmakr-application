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
    return true;
  }
  else {
    router.navigate(['users/login']);
    alert("Please sign in.");
    return false;
  }
};

