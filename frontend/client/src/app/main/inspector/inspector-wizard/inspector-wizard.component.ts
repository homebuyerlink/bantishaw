import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { NgForm, FormArray, Validators, EmailValidator, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Config } from './../../../config';
import { InspectorService } from '../../../services/inspector.service';
import { Utils } from '../../../utils';
import { Router } from '@angular/router';
declare const google: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-inspector-wizard',
  templateUrl: './inspector-wizard.component.html',
  styleUrls: ['./inspector-wizard.component.css']
})
export class InspectorWizardComponent implements OnInit, AfterViewInit {

  public inspectorScheduleForm: FormGroup;
  public latitude: any;
  public longitude: any;
  public address = '';
  public location = '';
  public agentArray = [];
  public servicesArray = [];
  public teams = [];
  @ViewChild('gmap') gmapElement: any;
  map: any;
  public cityCircle: any;
  public step = 0;
  public inspectorDetailForm: FormGroup;
  public servicesFormStep3: FormGroup;
  public inspectorDetailFormStep2: FormGroup;
  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public reactiveUploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public selectedIndex: any = null;
  public image = '';
  public companyDetails = {
    _id: null,
    slug: null
  };
  constructor(private _fb: FormBuilder, private authservice: AuthenticationService, private inspector: InspectorService, private router: Router) {
    this.step = authservice.profile.profileWizardStep;
    this.reactiveUploader.onAfterAddingFile = (file: FileItem) => {
      file.formData.push({ index: this.selectedIndex });
    }
  }

  ngAfterViewInit() {
    if (this.step == 0)
      this.initmap();
  }

  ngOnInit() {
    let ctrl = new FormControl(null, Validators.required);
    this.inspectorDetailForm = new FormGroup({
      'tags': new FormControl('', Validators.required),
      'inspectorDetailArray': this._fb.array([this.initinspectorDetail()],
      )
    });
    //3rd step
    this.servicesFormStep3 = new FormGroup({
      'servicesArray': this._fb.array([this.initinspectorServicesDetail()])
    });
    //4th step
    this.inspectorScheduleForm = new FormGroup({
      'mondaySchedule': this._fb.array([this.initmondaySchedule()]),
      'tuesdaySchedule': this._fb.array([this.initTuesdaySchedule()]),
      'wednesdaySchedule': this._fb.array([this.initWednesdaySchedule()]),
      'thursdaySchedule': this._fb.array([this.initThursdaySchedule()]),
      'fridaySchedule': this._fb.array([this.initFridaySchedule()]),
      'saturdaySchedule': this._fb.array([this.initSaturdaySchedule()]),
      'sundaySchedule': this._fb.array([this.initSundaySchedule()]),
      'notification': this._fb.control('', Validators.required)
    });
    this.getCompanyDetails();
  }

  fileEvent(fileInput: any, i: number) {
    this.selectedIndex = i;
  }

  async getCompanyDetails() {
    Utils.showLoader('body');
    try {
      this.companyDetails = (<any>await this.inspector.getCompanyDetails());
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('body');
  }

  //1st  step form
  async onSubmittingBasicInfoForm(companyBasicInfo: NgForm) {
    Utils.showLoader('#companyForm');
    this.uploader.uploadAll();
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      this.image = JSON.parse(response).url;
      this.afterPictureUpload(companyBasicInfo);
    }
  }

  private async afterPictureUpload(companyBasicInfo) {
    try {
      let name = companyBasicInfo.value['name'];
      let addressLine1 = companyBasicInfo.value['addressLine1'];
      let addressLine2 = companyBasicInfo.value['addressLine2'];
      let city = companyBasicInfo.value['city'];
      let state = companyBasicInfo.value['state'];
      let zip = companyBasicInfo.value['zip'];
      let phone = companyBasicInfo.value['phone'];
      let email = companyBasicInfo.value['email'];
      let website = companyBasicInfo.value['website'];
      let founded = companyBasicInfo.value['founded'];
      let lat = this.latitude;
      let lng = this.longitude;
      let radius = companyBasicInfo.value['radius'];
      let userId = this.authservice.profile._id;
      let facebook = companyBasicInfo.value['facebook'];
      let youtube = companyBasicInfo.value['youtube'];
      let instagram = companyBasicInfo.value['instagram'];
      let gplus = companyBasicInfo.value['gplus'];
      let twitter = companyBasicInfo.value['twitter'];
      let associations = companyBasicInfo.value['associations'];
      let response = await this.inspector.saveDetailsStep1(name, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, this.image, lat, lng, radius, userId,
        facebook, youtube, instagram, gplus, twitter, associations);
      this.companyDetails = (<any>response).inspectionCompany;
      this.step = 1;
      this.scrollUp();
    } catch (error) {
      alert(error);
    }
    Utils.hideLoader('#companyForm');
  }

  //2nd step
  async saveInspectorDetail() {
    Utils.showLoader('#inspectorForm');
    try {
      if (this.inspectorDetailForm.valid) {
        this.agentArray = this.inspectorDetailForm.value['inspectorDetailArray'];
        this.reactiveUploader.uploadAll();
        this.reactiveUploader.onCompleteItem = (item: FileItem, response, status, header) => {
          this.agentArray[item.formData[0].index].image = JSON.parse(response).url;
        }
        this.reactiveUploader.onCompleteAll = () => {
          this.saveAgentsAfterUploadComplete();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveAgentsAfterUploadComplete() {
    try {
      let teamMembers = this.agentArray;
      let tags = this.inspectorDetailForm.value.tags
      this.companyDetails = (<any>await this.inspector.getCompanyDetails());
      let obj = {
        companyId: this.companyDetails._id,
        userId: this.authservice.profile._id,
        teamMembers: teamMembers,
        tags: tags
      };
      await this.inspector.setInspectorDetails(obj);
      this.step = 2;
      this.scrollUp();
    } catch (error) {
      console.log(error);
    }
    this.reactiveUploader.clearQueue();
    Utils.hideLoader('#inspectorForm');
  }

  //3rd step
  async saveServices() {
    Utils.showLoader('#serviceForm');
    this.servicesArray = this.servicesFormStep3.value.servicesArray;
    // console.log(this.servicesArray);
    for (let index = 0; index < this.servicesArray.length; index++) {
     var res= this.servicesArray.values[index];      
    }
    this.reactiveUploader.uploadAll();
    this.reactiveUploader.onCompleteItem = (item: FileItem, response, status, header) => {
      this.servicesArray[item.formData[0].index].image = JSON.parse(response).url;
    }
    this.reactiveUploader.onCompleteAll = () => {
      this.saveServicesAfterUploadComplete();
    }
  }

  async saveServicesAfterUploadComplete() {
    try {
      let obj = {
        companyId: this.companyDetails._id,
        userId: this.authservice.profile._id,
        services: this.servicesArray,
      };
      await this.inspector.setServicesDetails(obj);
      this.step = 3;
      this.scrollUp();
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#serviceForm');
  }

  //4th
  saveStep4(inspectorScheduleForm) {
    console.log();
  }

  initinspectorDetail() {
    return this._fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  addMoreDetail() {
    const control = <FormArray>this.inspectorDetailForm.controls['inspectorDetailArray'];
    control.push(this.initinspectorDetail());
  }
  removeAddress(i: number) {
    const control = <FormArray>this.inspectorDetailForm.controls['inspectorDetailArray'];
    control.removeAt(i);
  }

  initinspectorServicesDetail() {
    return this._fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      promo: ['', Validators.required],
      details: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  addMoreDetailStep3() {
    const control = <FormArray>this.servicesFormStep3.controls['servicesArray'];
    control.push(this.initinspectorServicesDetail());
  }
  removeService(i){
    const control = <FormArray>this.servicesFormStep3.controls['servicesArray'];
    control.removeAt(i);
  }
  removeServiceStep2(i){
    const control = <FormArray>this.servicesFormStep3.controls['servicesArray'];
    control.removeAt(i);
  }
  //google map cred
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

  private setMap(mapProp) {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    var input = document.getElementById('address');
    if (input != null) {
      var searchBox = new google.maps.places.SearchBox(input);
      // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      this.map.addListener('bounds_changed', () => {
        searchBox.setBounds(this.map.getBounds());
      });
      searchBox.addListener('places_changed', () => {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });
    }
  }

  //monday block
  initmondaySchedule() {
    return this._fb.group({
      start: [''],
      end: ['']
    });
  }
  addMoretoMondaySchedule() {
    const control = <FormArray>this.inspectorScheduleForm.controls['mondaySchedule'];
    control.push(this.initmondaySchedule());
  }
  //tuesday block
  initTuesdaySchedule() {
    return this._fb.group({
      start: [''],
      end: ['']
    });
  }
  addMoretoTuesdaySchedule() {
    const control = <FormArray>this.inspectorScheduleForm.controls['tuesdaySchedule'];
    control.push(this.initTuesdaySchedule());
  }
  //wednesday block
  initWednesdaySchedule() {
    return this._fb.group({
      start: [''],
      end: ['']
    });
  }
  addMoretoWednesdaySchedule() {
    const control = <FormArray>this.inspectorScheduleForm.controls['wednesdaySchedule'];
    control.push(this.initWednesdaySchedule());
  }
  //thursday block
  initThursdaySchedule() {
    return this._fb.group({
      start: [''],
      end: ['']
    });
  }
  addMoretoThursdaySchedule() {
    const control = <FormArray>this.inspectorScheduleForm.controls['thursdaySchedule'];
    control.push(this.initThursdaySchedule());
  }
  //friday block
  initFridaySchedule() {
    return this._fb.group({
      start: [''],
      end: ['']
    });
  }
  addMoretoFridaySchedule() {
    const control = <FormArray>this.inspectorScheduleForm.controls['fridaySchedule'];
    control.push(this.initFridaySchedule());
  }
  //saturday block
  initSaturdaySchedule() {
    return this._fb.group({
      start: [''],
      end: ['']
    });
  }
  addMoretoSaturdaySchedule() {
    const control = <FormArray>this.inspectorScheduleForm.controls['saturdaySchedule'];
    control.push(this.initSaturdaySchedule());
  }
  //sunday block
  initSundaySchedule() {
    return this._fb.group({
      start: [''],
      end: ['']
    });
  }
  addMoretoSundaySchedule() {
    const control = <FormArray>this.inspectorScheduleForm.controls['sundaySchedule'];
    control.push(this.initSundaySchedule());
  }
  async saveSchedule(inspectorScheduleForm: FormGroup) {
    Utils.showLoader('body');
    try {
      let schedule = [];
      let formValue = inspectorScheduleForm.value;
      formValue.mondaySchedule.forEach(element => {
        schedule.push({
          day: 'monday',
          start: element.start,
          end: element.end
        })
      });
      formValue.tuesdaySchedule.forEach(element => {
        schedule.push({
          day: 'tuesday',
          start: element.start,
          end: element.end
        })
      });
      formValue.wednesdaySchedule.forEach(element => {
        schedule.push({
          day: 'wednesday',
          start: element.start,
          end: element.end
        })
      });
      formValue.thursdaySchedule.forEach(element => {
        schedule.push({
          day: 'thursday',
          start: element.start,
          end: element.end
        })
      });
      formValue.fridaySchedule.forEach(element => {
        schedule.push({
          day: 'friday',
          start: element.start,
          end: element.end
        })
      });
      formValue.saturdaySchedule.forEach(element => {
        schedule.push({
          day: 'saturday',
          start: element.start,
          end: element.end
        })
      });
      formValue.sundaySchedule.forEach(element => {
        schedule.push({
          day: 'sunday',
          start: element.start,
          end: element.end
        })
      });
      let body = {
        schedule: schedule,
        userId: this.authservice.profile._id,
        companyId: this.companyDetails._id,
        emailNotification: formValue.notification
      }
      await this.inspector.setTimeslots(body);
      this.router.navigate(['/inspector/profile/' + this.companyDetails.slug]);
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('body');
  }
  scrollUp() {
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  removetoMondaySchedule(i: number) {
    const control = <FormArray>this.inspectorScheduleForm.controls['mondaySchedule'];
    control.removeAt(i);
  }
  removetoTuesdaySchedule(i) {
  const control = <FormArray>this.inspectorScheduleForm.controls['tuesdaySchedule'];
  control.removeAt(i);
  }
  removetoWednesdaySchedule(i) {
    const control = <FormArray>this.inspectorScheduleForm.controls['wednesdaySchedule'];
    control.removeAt(i);
  }
  removetoThursdaySchedule(i: number) {
    const control = <FormArray>this.inspectorScheduleForm.controls['thursdaySchedule'];
    control.removeAt(i);
  }
  removetoFirdaySchedule(i) {
    const control = <FormArray>this.inspectorScheduleForm.controls['fridaySchedule'];
    control.removeAt(i);
  }
  removetoSaturdaySchedule(i) {
    const control = <FormArray>this.inspectorScheduleForm.controls['saturdaySchedule'];
    control.removeAt(i);
  }
  removetoSundaySchedule(i) {
    const control = <FormArray>this.inspectorScheduleForm.controls['sundaySchedule'];
    control.removeAt(i);
  }
  
}
