import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthenticationService } from '../../services/authentication.service';
import { Utils } from '../../utils';
import { InspectorService } from '../../services/inspector.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public errormessage: any;
  companyDetails = {
    slug: null,
    _id: null
  }
  
  constructor(public authService: AuthenticationService, private ngxSocialLoginAuthService: AuthService, private inspectorService: InspectorService) { }

  ngOnInit() {
    this.getCompanyDetails();
  }

  async registerNow(signUpForm: NgForm) {
    Utils.showLoader('#modal');
    try {
      let username = signUpForm.value['username'];
      let email = signUpForm.value['email'];
      let password = signUpForm.value['password'];
      let userType = signUpForm.value['userType'];
      await this.authService.signup(username, email, password, userType);
      signUpForm.reset();
    } catch (error) {
      console.error(error);
    }
    Utils.hideLoader('#modal');
  }

  async onSubmittingSignInForm(signInForm: NgForm) {
    Utils.showLoader('#modal');
    try {
      let email = signInForm.value['email'];
      let password = signInForm.value['password'];
      let Response = await this.authService.login(email, password);
      signInForm.reset();
    } catch (error) {
      this.errormessage = error.error.message + " Please try again";
    }
    Utils.hideLoader('#modal');
  }

  logOutMe() {
    this.authService.logout();
  }

  async loginWithFacebook() {
    Utils.showLoader('#modal');
    try {
      await this.ngxSocialLoginAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.ngxSocialLoginAuthService.authState.subscribe((user) => {
        this.authService.getAuthState(user);
      });
    } catch (error) {
      console.error(error);
    }
    Utils.hideLoader('#modal');
  }

  async loginWithGoogle() {
    Utils.showLoader('#modal');
    try {
      await this.ngxSocialLoginAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.ngxSocialLoginAuthService.authState.subscribe((user) => {
        this.authService.getAuthState(user);
      });
    } catch (error) {
      console.error(error);
    }
    Utils.hideLoader('#modal');
  }

  async getCompanyDetails() {
    try {
      this.companyDetails = (<any>await this.inspectorService.getCompanyDetails());
    } catch (error) {
      console.log(error);
    }
  }

}
