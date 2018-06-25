import { Component, OnInit } from '@angular/core';
import { InspectorService } from '../../../services/inspector.service';
import { Utils } from '../../../utils';

@Component({
  selector: 'app-inspector-profile',
  templateUrl: './inspector-profile.component.html',
  styleUrls: ['./inspector-profile.component.css']
})
export class InspectorProfileComponent implements OnInit {

  companyDetails = {
    "slug": null,
    "_id": null,
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
    "userId": null,
    "createdAt": null,
    "updatedAt": null,
  }

  constructor(private inspectorService: InspectorService) { }

  ngOnInit() {
    this.getCompanyDetails();
  }

  async getCompanyDetails() {
    Utils.showLoader('#profilePage');
    try {
      this.companyDetails = (<any>await this.inspectorService.getCompanyDetails());
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#profilePage');
  }

}
