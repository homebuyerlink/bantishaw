import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (await this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    else return true;
  }
}
