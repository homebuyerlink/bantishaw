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

  constructor(private authService: AuthenticationService, private ngxSocialLoginAuthService: AuthService) { }

  async  ngOnInit() {
  }


  async onSubmittingSignupForm(signUpForm: NgForm) {
    try {
      let username = signUpForm.value['username'];
      let email = signUpForm.value['email'];
      let password = signUpForm.value['password'];
      let response = await this.authService.signup(username, email, password);
      signUpForm.reset();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async onSubmittingSignInForm(signInForm: NgForm) {
    try {
      let email = signInForm.value['email'];
      let password = signInForm.value['password'];
      await this.authService.login(email, password);
      signInForm.reset();
    } catch (error) {
      console.log(error);
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
