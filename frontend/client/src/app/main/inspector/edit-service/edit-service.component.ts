import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { Config } from './../../../config';
import { InspectorService } from '../../../services/inspector.service';
import { Utils } from '../../../utils';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

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
  selectedService = {
    "_id": null,
    "name": null,
    "image": null,
    "price": null,
    "promo": null,
    "details": null,
    "inspectionCompanyId": null
  }

  constructor(private authservice: AuthenticationService, private inspectorService: InspectorService) { }

  ngOnInit() {
    this.getInspectorCompanyDetailsById();
  }

  async editService(editServiceForm: NgForm) {
    Utils.showLoader('#editServiceForm');
    try {
      if (this.uploader.queue.length > 0) {
        this.uploader.uploadAll();
        this.uploader.queue[this.uploader.queue.length - 1].onSuccess = (response, status, headers) => {
          this.image = JSON.parse(response).url;
          this.afterPictureUpload(editServiceForm);
        }
      } else {
        this.image = this.selectedService.image;
        this.afterPictureUpload(editServiceForm);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async afterPictureUpload(editServiceForm) {
    try {
      let name = editServiceForm.value.name;
      let price = editServiceForm.value.price;
      let promo = editServiceForm.value.promo;
      let details = editServiceForm.value.details;
      await this.inspectorService.editServiceDetails(this.selectedService._id, name, price, promo, details, this.image);
      (<any>$('#myModal')).modal('hide');
      this.uploader.queue.length = 0;
      this.getInspectorCompanyDetailsById();
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#editServiceForm');
  }

  getServiceId(value) {
    this.selectedService = value;
  }

  async getInspectorCompanyDetailsById() {
    Utils.showLoader('#serviceDetails');
    try {
      this.inspectorCompanyDetails = (<any>await this.inspectorService.getInspectorCompanyById());
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#serviceDetails');
  }

}
