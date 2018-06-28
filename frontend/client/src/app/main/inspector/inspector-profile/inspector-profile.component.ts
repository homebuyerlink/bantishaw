import { Component, OnInit } from '@angular/core';
import { InspectorService } from '../../../services/inspector.service';
import { Utils } from '../../../utils';
import { ActivatedRoute } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-inspector-profile',
  templateUrl: './inspector-profile.component.html',
  styleUrls: ['./inspector-profile.component.css']
})
export class InspectorProfileComponent implements OnInit {

  inspectorCompanyDetails = {
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

  constructor(private authService: AuthenticationService, private inspectorService: InspectorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.slug = params.slug;
    });
    this.getInspectorCompanyDetailsBySlug();
  }

  async getInspectorCompanyDetailsBySlug() {
    Utils.showLoader('#profilePage');
    try {
      this.inspectorCompanyDetails = (<any>await this.inspectorService.getInspectorCompanyBySlug(this.slug));
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#profilePage');
  }

}
