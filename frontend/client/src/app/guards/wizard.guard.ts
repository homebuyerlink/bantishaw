import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WizardGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (await this.authenticationService.isLoggedIn()) {
      if (this.authenticationService.profile.profileWizardTotalSteps - this.authenticationService.profile.profileWizardStep > 0) {
        if (this.authenticationService.profile.userType == 'inspector') {
          this.router.navigate(['/inspector/wizard']);
          return false;
        }
      }
    }
    else
      return true;
  }
}
