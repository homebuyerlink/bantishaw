import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Config } from './../../../../config';
import { InspectorService } from '../../../../services/inspector.service';
import { Utils } from '../../../../utils';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
declare const google: any;

@Component({

  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']

})

export class EditCompanyComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public address = '';
  public location = '';
  public companyDetails = {
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
    "social": [],
  }

  @ViewChild('gmap') gmapElement: any;
  map: any;
  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public image = '';

  constructor(private route: ActivatedRoute, private inspectorService: InspectorService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getCompanyDetails();
  }

  async getCompanyDetails() {
    Utils.showLoader('#editCompanyForm');
    try {
      let response = await this.inspectorService.getInspectorCompanyById();
      this.companyDetails = <any>response;
      this.latitude = parseFloat(this.companyDetails.lat);
      this.longitude = parseFloat(this.companyDetails.lng);
      this.initmap();
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#editCompanyForm');
  }

  async editCompanyDetails(editCompanyForm: NgForm) {
    Utils.showLoader('#editCompanyForm');
    this.uploader.uploadAll();
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      this.image = JSON.parse(response).url;
      this.afterPictureUpload(editCompanyForm);
    }
  }

  private async afterPictureUpload(editCompanyForm) {
    try {
      let name = editCompanyForm.value['name'];
      let addressLine1 = editCompanyForm.value['addressLine1'];
      let addressLine2 = editCompanyForm.value['addressLine2'];
      let city = editCompanyForm.value['city'];
      let state = editCompanyForm.value['state'];
      let zip = editCompanyForm.value['zip'];
      let phone = editCompanyForm.value['phone'];
      let email = editCompanyForm.value['email'];
      let website = editCompanyForm.value['website'];
      let founded = editCompanyForm.value['founded'];
      let lat = this.latitude;
      let lng = this.longitude;
      let radius = editCompanyForm.value['radius'];
      let userId = this.authService.profile._id;
      let facebook = editCompanyForm.value['facebook'];
      let youtube = editCompanyForm.value['youtube'];
      let instagram = editCompanyForm.value['instagram'];
      let gplus = editCompanyForm.value['google-plus'];
      let twitter = editCompanyForm.value['twitter'];
      let associations = editCompanyForm.value['associations'];
      await this.inspectorService.updateCompanyInfo(this.companyDetails._id, name, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, this.image, lat, lng, radius, userId, facebook, youtube, instagram, gplus, twitter, associations);
    } catch (error) {
      alert(error);
    }
    Utils.hideLoader('#editCompanyForm');
  }

  initmap() {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.map.setCenter({ lat: this.latitude, lng: this.longitude });
    this.getLocation({ lat: this.latitude, lng: this.longitude });
    this.setMarker(this.map);
  }

  public setMarker(mapProp) {
    var marker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: mapProp,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });
    this.getLocation({ lat: this.latitude, lng: this.longitude });
    google.maps.event.addListener(marker, 'dragend', (event) => {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      this.getLocation(event.latLng);
    });
  }

  private getLocation(latLng) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'location': latLng }, (results, status) => {
      if (status === 'OK') {
        this.location = results[0];
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

}
