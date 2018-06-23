import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { NgForm, FormArray, Validators, EmailValidator, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CompanyService } from '../../services/inspector.service';
declare const google: any;
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Config } from '../../config';
@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit, AfterViewInit {

  public latitude: any;
  public longitude: any;
  public address = '';
  public teams = [];
  @ViewChild('gmap') gmapElement: any;
  map: any;
  public cityCircle: any;
  public step1: boolean = false;
  public step2: boolean = false;
  public step3: boolean = true;
  public step4: boolean = false;
  public inspectorDetailForm: FormGroup;
  public inspectorDetailFormStep3: FormGroup;
  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public image = "";
  constructor(private _fb: FormBuilder, private authservice: AuthenticationService, private company: CompanyService) { }
  ngAfterViewInit() {
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
    this.inspectorDetailFormStep3 = new FormGroup({
      'inspectorDetailArrayStep3': this._fb.array([this.initinspectorDetail3rd()])
    })
  }

  private async afterPictureUpload(companyBasicInfo) {
    // try {
    //   let name = companyBasicInfo.value['name'];
    //   let addressLine1 = companyBasicInfo.value['addressLine1'];
    //   let addressLine2 = companyBasicInfo.value['addressLine2'];
    //   let city = companyBasicInfo.value['city'];
    //   let state = companyBasicInfo.value['state'];
    //   let zip = companyBasicInfo.value['zip'];
    //   let phone = companyBasicInfo.value['phone'];
    //   let email = companyBasicInfo.value['email'];
    //   let website = companyBasicInfo.value['website'];
    //   let founded = companyBasicInfo.value['founded'];
    //   let lat = this.latitude;
    //   let lng = this.longitude;
    //   let radius = 50;
    //   let userId = this.authservice.profile._id;
    //   let facebook = companyBasicInfo.value['facebook'];
    //   let youtube = companyBasicInfo.value['youtube'];
    //   let instagram = companyBasicInfo.value['instagram'];
    //   let gplus = companyBasicInfo.value['gplus'];
    //   let twitter = companyBasicInfo.value['twitter'];
    //   let associations = companyBasicInfo.value['associations'];
    //   let response = await this.company.saveDetailsStep1(name, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, this.image, lat, lng, radius, userId,
    //     facebook, youtube, instagram, gplus, twitter, associations);
    //   console.log(response);
    // } catch (error) {
    //   alert(error);
    // }
  }

  //1st  step form
  async onSubmittingBasicInfoForm(companyBasicInfo: NgForm) {
    // this.uploader.uploadAll();
    // this.uploader.queue[0].onSuccess = (response, status, headers) => {
    //   this.image = JSON.parse(response)[0];
    //   this.afterPictureUpload(companyBasicInfo);
    // }


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
      let radius = 50;
      let image = "abc";
      let userId = this.authservice.profile._id;
      let facebook = companyBasicInfo.value['facebook'];
      let youtube = companyBasicInfo.value['youtube'];
      let instagram = companyBasicInfo.value['instagram'];
      let gplus = companyBasicInfo.value['gplus'];
      let twitter = companyBasicInfo.value['twitter'];
      let associations = companyBasicInfo.value['associations'];
      let response = await this.company.saveDetailsStep1(name, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, image, lat, lng, radius, userId,
        facebook, youtube, instagram, gplus, twitter, associations);
      console.log(response);
    } catch (error) {
      alert(error);
    }
  }
  //2nd step
  save() {
    let values = this.inspectorDetailForm.value['inspectorDetailArray'];
    console.log(values);

    console.log("value of tag array", this.inspectorDetailForm.value['tags']);
    let teamMembers = this.teams.push(values);
    console.log(teamMembers);

    // const val: Array<any> = [
    //   // this.purchaseForm.value['sD'],
    //   // this.purchaseForm.value['ref'],
    //   // this.purchaseForm.value['pL'],
    //   // this.purchaseForm.value['email'],
    //   this.purchaseForm.value['newRowArray']
    // ]
    // console.log(JSON.stringify(val));
    // console.log(this.purchaseForm.valid);
  }
  //3rd step
  saveStep3() {
    let values = this.inspectorDetailFormStep3.value['inspectorDetailArrayStep3'];

  }

  initinspectorDetail() {
    return this._fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      image: [Validators.required],

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

  initinspectorDetail3rd() {
    return this._fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      promo: ['', Validators.required],
      details: ['', Validators.required],

    });
  }
  addMoreDetailStep3() {
    const control = <FormArray>this.inspectorDetailFormStep3.controls['inspectorDetailArrayStep3'];
    control.push(this.initinspectorDetail3rd());
  }


  //google map cred
  initmap() {

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

    google.maps.event.addListener(marker, 'dragend', (event) => {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      console.log(this.latitude, this.longitude);
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
  // setRadius() {
  //   this.cityCircle = new google.maps.Circle({
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: '#FF0000',
  //     fillOpacity: 0.35,
  //     map: this.map,
  //     center: { lat: this.latitude, lng: this.longitude },
  //     radius: 5 * 1000
  //   });
  //   this.map.fitBounds(this.cityCircle.getBounds());
  // }

}
