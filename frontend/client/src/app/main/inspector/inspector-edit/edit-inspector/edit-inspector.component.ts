import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { Config } from './../../../../config';
import { InspectorService } from '../../../../services/inspector.service';
import { Utils } from '../../../../utils';

@Component({
  selector: 'app-edit-inspector',
  templateUrl: './edit-inspector.component.html',
  styleUrls: ['./edit-inspector.component.css']
})
export class EditInspectorComponent implements OnInit {

  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public image = '';
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

  constructor(private authservice: AuthenticationService, private inspectorService: InspectorService) { }

  ngOnInit() {
    this.getInspectorCompanyDetailsById();
  }

  async editAgent(editAgentForm: NgForm) {
    Utils.showLoader('#myModal');
    try {
      this.uploader.uploadAll();
      this.uploader.queue[this.uploader.queue.length - 1].onSuccess = (response, status, headers) => {
        this.image = JSON.parse(response).url;
        this.afterPictureUpload(editAgentForm);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async afterPictureUpload(editAgentForm) {
    try {
      let name = editAgentForm.value.name;
      let designation = editAgentForm.value.designation;
      let phone = editAgentForm.value.phone;
      let email = editAgentForm.value.email;
      await this.inspectorService.editAgentDetails(name, designation, phone, email, this.image);
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#myModal');
  }

  async getInspectorCompanyDetailsById() {
    Utils.showLoader('#agentDetais');
    try {
      this.inspectorCompanyDetails = (<any>await this.inspectorService.getInspectorCompanyById());
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#agentDetais');
  }

}
