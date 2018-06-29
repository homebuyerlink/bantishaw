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
    "social": [

    ],

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
    let response = await this.inspectorService.getInspectorCompanyById();
    this.companyDetails = <any>response;
    this.latitude = parseFloat(this.companyDetails.lat);
    this.longitude = parseFloat(this.companyDetails.lng);
    this.initmap();
    return response;
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
      let gplus = editCompanyForm.value['gplus'];
      let twitter = editCompanyForm.value['twitter'];
      let associations = editCompanyForm.value['associations'];
      let companyId=this.companyDetails._id;
      let response= await this.inspectorService.updateCompanyInfo(companyId, name, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, this.image, lat, lng, radius,  facebook, youtube, instagram, gplus, twitter, associations);
      console.log(response);
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
}
