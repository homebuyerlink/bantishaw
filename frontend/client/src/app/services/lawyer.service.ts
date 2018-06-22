import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LawyerService {

  constructor() { }

  setCompanyDetails(companyName, lawyerName, designation, addressLine1, addressLine2, city, state, zip, phone, email, website, founded, image, lat, lng, radius, tags, userId, facebook, youtube, instagram, gplus, twitter, associations) {
    let body = {
      companyName: companyName, lawyerName: lawyerName, designation: designation, addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, zip: zip, phone: phone, email: email, website: website, founded: founded, image: image, lat: lat, lng: lng, radius: radius, tags: tags, userId: userId, facebook: facebook, youtube: youtube, instagram: instagram, gplus: gplus, twitter: twitter, associations: associations
    };
    console.log(body);

  }

}
