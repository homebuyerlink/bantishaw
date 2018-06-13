import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-guestheader',
  templateUrl: './guestheader.component.html',
  styleUrls: ['./guestheader.component.css']
})

export class GuestheaderComponent implements OnInit {

  public loggedIn: boolean = false;

  constructor(private authService: AuthenticationService) { }

  async  ngOnInit() {
    try {
      let response = await this.authService.isLoggedIn();
      this.loggedIn = response;
      // await this.authService.getProfile(localStorage.getItem('token'));
    } catch (error) {
      console.log(error);
    }
  }

  async onSubmittingSignupForm(signUpForm: NgForm) {
    try {
      let name = signUpForm.value['name'];
      let email = signUpForm.value['email'];
      let password = signUpForm.value['password'];
      let response = await this.authService.signup(name, email, password);
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
    } catch (error) {
      console.log(error);
    }
  }
  logOutMe() {
    this.authService.logout();
  }
}