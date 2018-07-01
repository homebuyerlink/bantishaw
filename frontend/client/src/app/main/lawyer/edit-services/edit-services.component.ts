import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LawyerService } from '../../../services/lawyer.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { Config } from '../../../config';
import { Utils } from '../../../utils';

@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {
  public allServices = [];

  selectedService = {
    "_id": null,
    "name": null,
    "image": null,
    "price": null,
    "promo": null,
    "details": null
  }
  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public image = '';
  constructor(private lawyerService: LawyerService, private authService: AuthenticationService) { }
  ngOnInit() {
    this.getServices();
  }

  getAgentId(value) {
    this.selectedService = value;
  }
  async submitEditServices(editFormServices: NgForm) {
    Utils.showLoader('#editFormServices');
    try {
      if (this.uploader.queue.length > 0) {
        this.uploader.uploadAll();
        this.uploader.queue[this.uploader.queue.length - 1].onSuccess = (response, status, headers) => {
          this.image = JSON.parse(response).url;
          this.afterPictureUpload(editFormServices);
        }
      } else {
        this.image = this.selectedService.image;
        this.afterPictureUpload(editFormServices);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getServices() {
    Utils.showLoader('#serviceDetails');
    try {
      let response = await this.lawyerService.getLawyerCompanyById();
      this.allServices = (<any>response).services;
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#serviceDetails');
  }

  async afterPictureUpload(editFormServices) {
    try {
      let name = editFormServices.value.name;
      let price = editFormServices.value.price;
      let promo = editFormServices.value.promo;
      let details = editFormServices.value.details;
      await this.lawyerService.updatelawyerService(this.selectedService._id, name, this.image, price, promo, details);
      (<any>$('#myModal')).modal('hide');
      this.uploader.queue.length = 0;
      this.getServices();
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#editFormServices');
  }
}