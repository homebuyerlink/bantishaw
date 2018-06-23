import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public errormessage: any;
  constructor(public authService: AuthenticationService, private ngxSocialLoginAuthService: AuthService) { }

  ngOnInit() {
  }

  async registerNow(signUpForm: NgForm) {
    try {
      let username = signUpForm.value['username'];
      let email = signUpForm.value['email'];
      let password = signUpForm.value['password'];
      let userType = signUpForm.value['userType'];
      await this.authService.signup(username, email, password, userType);

      signUpForm.reset();
    } catch (error) {
      alert(error);
    }

  }
  async onSubmittingSignInForm(signInForm: NgForm) {
    try {
      let email = signInForm.value['email'];
      let password = signInForm.value['password'];
      let Response = await this.authService.login(email, password);
      signInForm.reset();
    } catch (error) {
      this.errormessage = error.error.message + " Please try again";
    }
  }
  logOutMe() {
    this.authService.logout();
  }
  async loginWithFacebook() {
    await this.ngxSocialLoginAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.ngxSocialLoginAuthService.authState.subscribe((user) => {
      this.authService.getAuthState(user);
    });
  }

  async loginWithGoogle() {
    await this.ngxSocialLoginAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.ngxSocialLoginAuthService.authState.subscribe((user) => {
      this.authService.getAuthState(user);
    });
  }
}
