import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (await this.authService.isLoggedIn()) {
      if (await this.authService.profile.username == '' || this.authService.profile.userType == '') {
        this.router.navigate(['/select-type']);
        return false;
      }
      else
        return true;
    }
    else
      return true;
  }
}