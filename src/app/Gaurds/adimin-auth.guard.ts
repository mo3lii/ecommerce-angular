import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../Services/admin-auth.service';

export const adiminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);
  if (authService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['admin/login']);
    return false;
  }
};
