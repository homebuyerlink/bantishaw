import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { NgForm, FormArray, Validators, EmailValidator, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Config } from '../../../config';
import { LawyerService } from '../../../services/lawyer.service';
import { Utils } from '../../../utils';
import { Router } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-lawyer-wizard',
  templateUrl: './lawyer-wizard.component.html',
  styleUrls: ['./lawyer-wizard.component.css']
})
export class LawyerWizardComponent implements OnInit {

  public latitude: any;
  public longitude: any;
  public location: any = null;
  public tags = [];
  @ViewChild('gmap') gmapElement: any;
  map: any;
  public step = 0;
  public inspectorDetailForm: FormGroup;
  public lawyerScheduleForm: FormGroup;
  public servicesForm: FormGroup;
  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public reactiveUploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  selectedIndex: any = null;
  servicesArray = [];
  public image = '';
  public companyDetails = {
    _id: null,
    slug: null
  };
  constructor(private _fb: FormBuilder, private authservice: AuthenticationService, private lawyerService: LawyerService, private router: Router) {
    this.step = authservice.profile.profileWizardStep;
    this.reactiveUploader.onAfterAddingFile = (file: FileItem) => {
      file.formData.push({ index: this.selectedIndex });
    }
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
    this.lawyerScheduleForm = new FormGroup({
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

  async getCompanyDetails() {
    Utils.showLoader('body');
    try {
      this.companyDetails = (<any>await this.lawyerService.getCompanyDetails());
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('body');
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
    if (this.servicesForm.valid) {
      Utils.showLoader('#serviceForm');
      this.servicesArray = this.servicesForm.value.servicesArray;
      this.reactiveUploader.uploadAll();
      this.reactiveUploader.onCompleteItem = (item: FileItem, response, status, header) => {
        this.servicesArray[item.formData[0].index].image = JSON.parse(response).url;
      }
      this.reactiveUploader.onCompleteAll = () => {
        this.saveServicesAfterUploadComplete();
      }
    }
  }

  async saveServicesAfterUploadComplete() {
    try {
      let obj = {
        companyId: this.companyDetails._id,
        userId: this.authservice.profile._id,
        services: this.servicesArray,
      };
      await this.lawyerService.setService(obj);
      this.step = 2;
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#serviceForm');
  }

  fileEvent(fileInput: any, i: number) {
    this.selectedIndex = i;
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
    const control = <FormArray>this.lawyerScheduleForm.controls['mondaySchedule'];
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
    const control = <FormArray>this.lawyerScheduleForm.controls['tuesdaySchedule'];
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
    const control = <FormArray>this.lawyerScheduleForm.controls['wednesdaySchedule'];
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
    const control = <FormArray>this.lawyerScheduleForm.controls['thursdaySchedule'];
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
    const control = <FormArray>this.lawyerScheduleForm.controls['fridaySchedule'];
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
    const control = <FormArray>this.lawyerScheduleForm.controls['saturdaySchedule'];
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
    const control = <FormArray>this.lawyerScheduleForm.controls['sundaySchedule'];
    control.push(this.initSundaySchedule());
  }
  async saveSchedule(lawyerScheduleForm: FormGroup) {
    Utils.showLoader('body');
    try {
      let schedule = [];
      let formValue = lawyerScheduleForm.value;
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
      await this.lawyerService.setTimeslots(body);
      this.router.navigate(['/lawyer/profile/' + this.companyDetails.slug]);
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('body');
  }
}
