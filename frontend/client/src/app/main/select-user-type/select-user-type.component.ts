import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-user-type',
  templateUrl: './select-user-type.component.html',
  styleUrls: ['./select-user-type.component.css']
})
export class SelectUserTypeComponent implements OnInit {
  public step1: boolean = false;
  public step2: boolean = false;

  constructor(private autheticationService: AuthenticationService,private router:Router) { }

  ngOnInit() {
    

    if (this.autheticationService.profile.username===undefined) {
      this.step1 = true;
      this.step2=false;   
    }

    else{
      this.step1 = false;
      this.step2=true; 
    }
   
    console.log(this.autheticationService.profile._id);
    
  }
  //for updating the name
  async onSubmittingUserTypeStep1(userTypeStep1: NgForm) {
    try {
     
      
      await this.autheticationService.updateUserName(this.autheticationService.profile._id, userTypeStep1.value['username']);
      this.step1 = false;
      this.step2=true; 
    
     
    } catch (error) {
      alert(error.error.message)
    }
  }
  //for updating the userType
  async  onSubmittingUserTypeStep2(userTypeStep2: NgForm) {
    try {
      let userID=this.autheticationService.profile._id;
      let userType=userTypeStep2.value['userType'];
      console.log(userType);    
     await this.autheticationService.updateUserType(userID,userType);
     this.router.navigate(['/']);
    } catch (error) {
      alert(error.error.message)
    }
  }
}