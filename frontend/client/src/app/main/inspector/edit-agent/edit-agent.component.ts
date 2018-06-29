import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { Config } from './../../../config';
import { InspectorService } from '../../../services/inspector.service';
import { Utils } from '../../../utils';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent implements OnInit {

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
  selectedAgent = {
    "_id": null,
    "designation": null,
    "email": null,
    "image": null,
    "name": null,
    "phone": null,
    "type": null
  }

  constructor(private authservice: AuthenticationService, private inspectorService: InspectorService) { }

  ngOnInit() {
    this.getInspectorCompanyDetailsById();
  }

  async editAgent(editAgentForm: NgForm) {
    Utils.showLoader('#editAgentForm');
    try {
      if (this.uploader.queue.length > 0) {
        this.uploader.uploadAll();
        this.uploader.queue[this.uploader.queue.length - 1].onSuccess = (response, status, headers) => {
          this.image = JSON.parse(response).url;
          this.afterPictureUpload(editAgentForm);
        }
      } else {
        this.image = this.selectedAgent.image;
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
      await this.inspectorService.editAgentDetails(this.selectedAgent._id, name, designation, phone, email, this.image);
      (<any>$('#myModal')).modal('hide');
      this.uploader.queue.length = 0;
      this.getInspectorCompanyDetailsById();
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#editAgentForm');
  }

  getAgentId(value) {
    this.selectedAgent = value;
  }

  async getInspectorCompanyDetailsById() {
 
    try {
      this.inspectorCompanyDetails = (<any>await this.inspectorService.getInspectorCompanyById());
      console.log(this.inspectorCompanyDetails);
    } catch (error) {
      console.log(error);
    }
    
  }

}
