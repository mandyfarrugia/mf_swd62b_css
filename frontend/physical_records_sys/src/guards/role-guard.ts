import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[]; //Fetch the roles metadata specified within data in the routing configuration.

  if (!authenticationService.isAuthenticated()) {
    router.navigate(['/login']);
    return false; //Block navigation to the path specified in routerLink.
  }

  //If no roles are specified (hence accessible by either anoymous or any logged in user) or any role can access this route, then allow access.
  if (!allowedRoles || allowedRoles.includes(authenticationService.user!.role)) {
    return true;
  }

  router.navigate(['/records']);
  return false; //Block navigation to the path specified in routerLink.
};
