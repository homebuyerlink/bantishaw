import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class CompanyService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  //step 1
  public async saveDetailsStep1(name,addressLine1,addressLine2,city,state,zip,phone,email,website,founded,image,lat,lng,radius,userId,
    facebook,youtube,instagram,gplus,twitter,associations) {
    let body = { name:name,addressLine1:addressLine1,addressLine2:addressLine2,city:city,state:state,zip:zip,phone:phone,email:email,website:website,founded:founded,image:image,lat:lat,lng:lng,radius:radius,userId:userId,
     facebook:facebook,youtube:youtube,instagram:instagram,gplus:gplus,twitter:twitter,associations:associations };
    let response = await this.httpClient.post(`${Config.API_BASE}/inspector/registration/wizard/step-1`, body, Config.HEADERS).toPromise();
    console.log(response);
    
    return response;
  }
  //step2
  public async saveDetailsStep2(companyId, userId, teamMembers, usertags) {
    let body = { 
      companyId:companyId, userId:userId, teamMembers:teamMembers, usertags:usertags
     };
    let response = await this.httpClient.post(`${Config.API_BASE}/inspector/registration/wizard/step-2`, body, Config.HEADERS).toPromise();
    return response;
  }
  //step 3
  public async saveDetailsStep3(companyId, userId, services) {
    let body = { companyId:companyId, userId:userId, services: services };
    let response = await this.httpClient.post(`${Config.API_BASE}/inspector/registration/wizard/step-3`, body, Config.HEADERS).toPromise();
    console.log(response);
    
    return response;
  }
  // //step 4
  // public async saveDetailsStep4(username, email, password, userType) {
  //   let body = { username: username, email: email, password: password, userType: userType };
  //   let response = await this.httpClient.post(`${Config.API_BASE}/user/signup`, body, Config.HEADERS).toPromise();
  //   return response;
  // }
  
}