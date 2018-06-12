import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public loginError = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  public async signup(signupForm: NgForm) {
    let name = signupForm.value.name;
    let email = signupForm.value.email;
    let password = signupForm.value.password;


    // if (signupForm.valid && password == passwordConfirmation) {
    //   if (phone.indexOf('03') != 0 && phone.length != 11) {
    //     alert("Phone number is invalid. Your phone number should be in the following format: 03xxxxxxxxx");
    //     return false;
    //   }

    try {
      await this.authService.signup(name, email, password);
    } catch (error) {
      console.log(error);
    }
  }
}
