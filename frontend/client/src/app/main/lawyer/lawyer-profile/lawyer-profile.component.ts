import { Component, OnInit } from '@angular/core';
import { LawyerService } from '../../../services/lawyer.service';
import { Utils } from '../../../utils';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lawyer-profile',
  templateUrl: './lawyer-profile.component.html',
  styleUrls: ['./lawyer-profile.component.css']
})
export class LawyerProfileComponent implements OnInit {

  lawyerCompanyDetails = {
    "_id": null,
    "slug": null,
    "name": null,
    "addressLine1": null,
    "addressLine2": null,
    "city": null,
    "state": null,
    "zip": null,
    "phone": null,
    "email": null,
    "website": null,
    "founded": null,
    "image": null,
    "lat": null,
    "lng": null,
    "radius": null,
    "userId": null,
    "createdAt": null,
    "updatedAt": null,
    "__v": null,
    "user": {
      "_id": null,
      "isActive": null,
      "isEmailVerified": null,
      "profileWizardStep": null,
      "profileWizardTotalSteps": null,
      "email": null,
      "name": null,
      "photoUrl": null,
      "provider": null,
      "createdAt": null,
      "updatedAt": null,
      "__v": null,
      "token": null,
      "username": null,
      "userType": null
    },
    "tags": [],
    "team": [],
    "services": [],
    "social": []
  }
  slug: any;

  constructor(private lawyerService: LawyerService, public authService: AuthenticationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.slug = params.slug;
    });
    this.getLawyerCompanyDetailsBySlug();
  }

  async getLawyerCompanyDetailsBySlug() {
    Utils.showLoader('#profilePage');
    try {
      this.lawyerCompanyDetails = (<any>await this.lawyerService.getLawyerCompanyBySlug(this.slug));
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#profilePage');
  }

  async getCompanyDetails() {
    Utils.showLoader('#profilePage');
    try {
      this.lawyerCompanyDetails = (<any>await this.lawyerService.getCompanyDetails());
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#profilePage');
  }
  scrollDowntoAgents() {
    $('html, body').animate({
      scrollTop: $("#agents").offset().top - 150
    }, 1000);
  }
  scrollDowntoServices() {
    $('html, body').animate({
      scrollTop: $("#services").offset().top - 150
    }, 1000);
  }

}
