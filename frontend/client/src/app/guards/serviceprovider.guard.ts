import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';





@Injectable()
export class ServiceProviderGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (await this.authService.profile.userType!==<any>(['agent','advisor','inspector','lawyer']) ) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    else return true;
  }
}
