import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const currentUserViewGuard: CanActivateFn = (route, state) => {
  // if no user is signed in, redirect to login page and return false
  const router = inject(Router);
  const platformID = inject(PLATFORM_ID);
  let token: any;
  token = getEmailStored(platformID);
  if (!token) {
    router.navigate(['users/login']);
    alert("Please sign in.");
    return false;
  }
  // if current user email corresponds with session id 
  
  var sessionID = getSessionStored(platformID);
  // if no session id found redirect to login
  if (!sessionID) {
    if (router) {
      testNoSession();
    }
    router.navigate(['users/login']);
    alert("Please sign in.");
    return false;
  }
  // otherwise, check that number in sessionID corresponds with email
  if (doesMatch(token, sessionID)) {
    // if so, get current user by email
    let as = inject(AuthService);
    const user = as.getUserByEmail(token).subscribe((data) => {
      if (data.id) {
        if (router) {
          testValidSession();
        }
        router.navigate(['users/' + data.id]);
      }
    });
  }
  else {
    if (router) {
      testInvalidSession();
    }
    router.navigate(['users/login']);
    alert("Please sign in.");
    return false;
  }
  return true;
};

function getEmailStored(platformID: Object) : string {
  var token: any;
  if (isPlatformBrowser(platformID)) {
    if (localStorage.getItem("email")) {
      token = decr(localStorage.getItem("email")!);
    }
    else {
      token = '';
    }
  }
  if (!token) {
    return '';
  }
  else {
    return token;
  }
}
function getSessionStored(platformID: Object) : string {
  var token: any;
  if (isPlatformBrowser(platformID)) {
    token = localStorage.getItem("session");
  }
  if (!token) {
    return '';
  }
  else {
    return token;
  }
}
function doesMatch(email: string, session: string) : boolean {
  if (email.length * 1274321 == (parseInt(session) || 0)) {
    return true;
  }
  return false;
}
function testNoSession() : boolean {
  return true;
}
function testInvalidSession() : boolean {
  return true;
}
function testValidSession() : boolean {
  return true;
}
function decr(str: string): string {
  const decryptedChars = str.split('').map((char) => {
    if (char.match(/[a-zA-Z]/)) {
        const baseCharCode = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        const shiftedCharCode = (char.charCodeAt(0) - baseCharCode - 3 + 26) % 26 + baseCharCode;
        return String.fromCharCode(shiftedCharCode);
    }
    return char; // Non-alphabetic characters remain unchanged
});
return decryptedChars.join('');
}
