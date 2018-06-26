import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Config } from './../../../../config';
import { InspectorService } from '../../../../services/inspector.service';
import { Utils } from '../../../../utils';
import { AuthenticationService } from '../../../../services/authentication.service';
declare const google: any;

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  public latitude: any;
  public longitude: any;
  public address = '';
  public location = '';
  @ViewChild('gmap') gmapElement: any;
  map: any;
  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public image = '';

  constructor(private inspectorService: InspectorService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.initmap();
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
      let radius = 50;
      let userId = this.authService.profile._id;
      let facebook = editCompanyForm.value['facebook'];
      let youtube = editCompanyForm.value['youtube'];
      let instagram = editCompanyForm.value['instagram'];
      let gplus = editCompanyForm.value['gplus'];
      let twitter = editCompanyForm.value['twitter'];
      let associations = editCompanyForm.value['associations'];
      await this.inspectorService.saveDetailsStep1(name, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, this.image, lat, lng, radius, userId, facebook, youtube, instagram, gplus, twitter, associations);
    } catch (error) {
      alert(error);
    }
    Utils.hideLoader('#editCompanyForm');
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
