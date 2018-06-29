import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { AuthService } from 'angularx-social-login';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LawyerService {

  constructor(private httpClient: HttpClient,private authservice:AuthenticationService) { }

  setCompanyDetails(companyName, lawyerName, designation,experience, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, image, lat, lng, radius, userId, facebook, youtube, instagram, gplus, twitter, associations, tags) {
   
    let body = {
      name: companyName, lawyerName: lawyerName, designation: designation, experience: experience, addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, zip: zip, phone: phone, email: email, website: website, founded: founded, image: image, lat: lat, lng: lng, radius: radius, userId: userId, facebook: facebook, youtube: youtube, instagram: instagram, gplus: gplus, twitter: twitter, associations: associations, tags: tags
    };    
    let response = this.httpClient.post(`${Config.API_BASE}/lawyer/registration/wizard/step-1`, body, Config.HEADERS).toPromise();
    return response;
  }
  setService(obj) {
    let response = this.httpClient.post(`${Config.API_BASE}/lawyer/registration/wizard/step-2`, obj, Config.HEADERS).toPromise();
    return response;
  }
  getCompanyDetails() {
    return this.httpClient.get(`${Config.API_BASE}/user/company?userId=${this.authservice.profile._id}`, Config.HEADERS).toPromise();
  }
  updatelawyerCompanyDetails(companyId,companyName, lawyerName, designation,experience, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, image, lat, lng, radius, userId, facebook, youtube, instagram, gplus, twitter, associations, tags){
    let body = {
      companyId:companyId, name: companyName, lawyerName: lawyerName, designation: designation, experience: experience, addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, zip: zip, phone: phone, email: email, website: website, founded: founded, image: image, lat: lat, lng: lng, radius: radius, userId: userId, facebook: facebook, youtube: youtube, instagram: instagram, gplus: gplus, twitter: twitter, associations: associations, tags: tags
    };
      this.httpClient.put(`${Config.API_BASE}/lawyer`,body,Config.HEADERS).toPromise();
  }
}
