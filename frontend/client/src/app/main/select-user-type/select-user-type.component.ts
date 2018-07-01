import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Utils } from '../../utils';

@Component({
  selector: 'app-select-user-type',
  templateUrl: './select-user-type.component.html',
  styleUrls: ['./select-user-type.component.css']
})
export class SelectUserTypeComponent implements OnInit {
  public step1: boolean = false;
  public step2: boolean = false;

  constructor(private autheticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (this.autheticationService.profile.username == null) {
      this.step1 = true;
    }
    else {
      this.step1 = false;
      this.step2 = true;
    }
  }
  //for updating the name
  async onSubmittingUserTypeStep1(userTypeStep1: NgForm) {
    Utils.showLoader('#step1');
    let password = userTypeStep1.value.password;
    let confirmPassword = userTypeStep1.value.confirmPassword;
    if (password != confirmPassword) {
      userTypeStep1.controls['confirmPassword'].setErrors({ confirm: true });
    }
    if (userTypeStep1.valid) {
      try {
        await this.autheticationService.updateUserName(this.autheticationService.profile._id, userTypeStep1.value['username'], password);
        if (this.autheticationService.profile.userType === undefined) {
          this.step1 = false;
          this.step2 = true;
        }
        else {
          this.router.navigate(['/']);
        }
      } catch (error) {
        alert(error.error.message)
      }
    }
    Utils.hideLoader('#step1');
  }

  //for updating the userType
  async  onSubmittingUserTypeStep2(userTypeStep2: NgForm) {
    Utils.showLoader('#step2');
    if (userTypeStep2.valid) {
      try {
        let userID = this.autheticationService.profile._id;
        let userType = userTypeStep2.value['userType'];
        await this.autheticationService.updateUserType(userID, userType);

        this.router.navigate(['/']);
      } catch (error) {
        alert(error.error.message)
      }
    }
    Utils.hideLoader('#step2');
  }
}