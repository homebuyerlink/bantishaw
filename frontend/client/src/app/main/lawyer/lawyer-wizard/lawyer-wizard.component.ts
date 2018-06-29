import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { NgForm, FormArray, Validators, EmailValidator, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { Config } from '../../../config';
import { LawyerService } from '../../../services/lawyer.service';
import { Utils } from '../../../utils';
declare const google: any;

@Component({
  selector: 'app-lawyer-wizard',
  templateUrl: './lawyer-wizard.component.html',
  styleUrls: ['./lawyer-wizard.component.css']
})
export class LawyerWizardComponent implements OnInit {

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
  public companyDetails = {
    _id: null
  };
  constructor(private _fb: FormBuilder, private authservice: AuthenticationService, private lawyerService: LawyerService) {
    this.step = authservice.profile.profileWizardStep;
  }

  ngAfterViewInit() {
    if (this.step == 0) {
      this.initmap();
    }
  }

  ngOnInit() {

    console.log(this.companyDetails._id);

    this.servicesForm = new FormGroup({
      'servicesArray': this._fb.array([this.initService()])
    })
  }

  setCompanyDetails(companyDetailsForm: NgForm) {
    Utils.showLoader('#companyForm');
    this.uploader.uploadAll();
    this.uploader.queue[this.uploader.queue.length - 1].onSuccess = (response, status, headers) => {
      this.image = JSON.parse(response).url;
      this.afterPictureUpload(companyDetailsForm);
    }
  }

  async afterPictureUpload(companyDetailsForm) {
    try {
      let companyName = companyDetailsForm.value['companyName'];
      let lawyerName = companyDetailsForm.value['lawyerName'];
      let designation = companyDetailsForm.value['designation'];
      let experience = companyDetailsForm.value['experience'];
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
      let radius = companyDetailsForm.value['radius'];
      // this.tags = companyDetailsForm.value.tags;
      // let tags = this.tags.map(el => el.value).toString();
      let tags = companyDetailsForm.value['tags'];
      let userId = this.authservice.profile._id;
      let facebook = companyDetailsForm.value['facebook'];
      let youtube = companyDetailsForm.value['youtube'];
      let instagram = companyDetailsForm.value['instagram'];
      let gplus = companyDetailsForm.value['google-plus'];
      let twitter = companyDetailsForm.value['twitter'];
      let associations = companyDetailsForm.value['associations'];
      await this.lawyerService.setCompanyDetails(companyName, lawyerName, designation, experience, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, this.image, lat, lng, radius, userId, facebook, youtube, instagram, gplus, twitter, associations, tags);
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
      details: ['', Validators.required]
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
      }
      this.companyDetails = (<any>await this.lawyerService.getCompanyDetails());
      let obj = {
        companyId: this.companyDetails._id,
        userId: this.authservice.profile._id,
        services: this.servicesForm.value.servicesArray,
      };
      console.log(obj);
      await this.lawyerService.setService(obj);
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
