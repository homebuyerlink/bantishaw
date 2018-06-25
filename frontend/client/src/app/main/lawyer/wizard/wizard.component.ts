import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { NgForm, FormArray, Validators, EmailValidator, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
declare const google: any;
import { FileUploader } from 'ng2-file-upload';
import { Config } from '../../../config';
import { LawyerService } from '../../../services/lawyer.service';
import { Utils } from '../../../utils';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})

export class WizardComponent implements OnInit {

  public latitude: any;
  public longitude: any;
  public tags = [];
  @ViewChild('gmap') gmapElement: any;
  map: any;
  public step = 0;
  public inspectorDetailForm: FormGroup;
  public servicesForm: FormGroup;
  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public image = '';

  constructor(private _fb: FormBuilder, private authservice: AuthenticationService, private lawyerService: LawyerService) {
    this.step = authservice.profile.profileWizardStep;
  }

  ngAfterViewInit() {
    if (this.step == 0) {
      this.initmap();
    }
  }

  ngOnInit() {
    this.servicesForm = new FormGroup({
      'servicesArray': this._fb.array([this.initService()])
    })
  }

  setCompanyDetails(companyDetailsForm: NgForm) {
    Utils.showLoader('#companyForm');
    this.uploader.uploadAll();
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      this.image = JSON.parse(response).url;
      this.afterPictureUpload(companyDetailsForm);
    }
  }

  async afterPictureUpload(companyDetailsForm) {
    try {
      let companyName = companyDetailsForm.value['companyName'];
      let lawyerName = companyDetailsForm.value['lawyerName'];
      let designation = companyDetailsForm.value['designation'];
      let addressLine1 = companyDetailsForm.value['addressLine1'];
      let addressLine2 = companyDetailsForm.value['addressLine2'];
      let city = companyDetailsForm.value['city'];
      let state = companyDetailsForm.value['state'];
      let zip = companyDetailsForm.value['zip'];
      let phone = companyDetailsForm.value['phone'];
      let email = companyDetailsForm.value['email'];
      let website = companyDetailsForm.value['website'];
      let founded = companyDetailsForm.value['founded'];
      let lat = this.latitude;
      let lng = this.longitude;
      let radius = 50;
      this.tags = companyDetailsForm.value.tags;
      let tags = this.tags.map(el => el.value).toString();
      let userId = this.authservice.profile._id;
      let facebook = companyDetailsForm.value['facebook'];
      let youtube = companyDetailsForm.value['youtube'];
      let instagram = companyDetailsForm.value['instagram'];
      let gplus = companyDetailsForm.value['gplus'];
      let twitter = companyDetailsForm.value['twitter'];
      let associations = companyDetailsForm.value['associations'];
      await this.lawyerService.setCompanyDetails(companyName, lawyerName, designation, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, this.image, lat, lng, radius, tags, userId, facebook, youtube, instagram, gplus, twitter, associations);
      this.step = 1;
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#companyForm');
  }

  initService() {
    return this._fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      promo: ['', Validators.required],
      details: ['', Validators.required],

    });
  }

  addMoreService() {
    const control = <FormArray>this.servicesForm.controls['servicesArray'];
    control.push(this.initService());
  }

  async setService() {
    Utils.showLoader('#serviceForm');
    try {
      this.uploader.uploadAll();
      this.uploader.queue[0].onSuccess = (response, status, headers) => {
        this.image = JSON.parse(response).url;
        console.log(this.image);
      }
      await this.lawyerService.setService(this.servicesForm.value.servicesArray);
      this.step = 2;
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#serviceForm');
  }

  initmap() {
    this.latitude = 50.186769;
    this.longitude = 8.698247;
    var mapProp = new google.maps.Map(this.gmapElement.nativeElement, {
      zoom: 12,
      center: new google.maps.LatLng(this.latitude, this.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.setMap(mapProp);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.latitude = pos.lat;
        this.longitude = pos.lng;
        mapProp.setCenter(pos);
        this.setMap(mapProp);
        this.setMarker(mapProp);
        // this.getCurrentAddresss(this.latitude, this.longitude);
      }, () => {
        mapProp.setCenter({ lat: this.latitude, lng: this.longitude });
        this.setMap(mapProp);
        this.setMarker(mapProp);
      });
    }
    else {
      console.log("Does not has geo location");
      this.setMarker(mapProp);
    }
  }

  setMarker(mapProp) {
    var marker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: mapProp,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    google.maps.event.addListener(marker, 'dragend', (event) => {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
    });
  }

  setMap(mapProp) {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
