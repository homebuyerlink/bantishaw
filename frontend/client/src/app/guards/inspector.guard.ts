import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class inspectrGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (await this.authService.profile.userType!=='inspector') { 
      this.router.navigate(['/unauthorized']);
      return false;
    }
    else return true;
  }
}