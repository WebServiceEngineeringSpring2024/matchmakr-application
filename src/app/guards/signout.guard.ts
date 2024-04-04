import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

export const signoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const srv = inject(AuthService);
  if (srv.signOut()) {
    router.navigate(['users/login']);
    return true;
  }
  else {
    router.navigate(['users/login']);
    return true;
  }
};
