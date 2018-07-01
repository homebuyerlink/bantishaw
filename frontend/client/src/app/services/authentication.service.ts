import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AuthenticationService {

  public profile = {
    isActive: false,
    isEmailVerified: false,
    profileWizardStep: 0,
    profileWizardTotalSteps: 1,
    _id: "",
    email: "",
    name: "",
    photoUrl: "",
    provider: "",
    createdAt: "",
    updatedAt: "",
    token: "",
    username: "",
    userType: ""
  }
  public isLogin = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  //Sign Up
  public async signup(username, email, password, userType) {
    let body = { username: username, email: email, password: password, userType: userType };
    let response = await this.httpClient.post(`${Config.API_BASE}/user/signup`, body, Config.HEADERS).toPromise();
    return response;
  }

  //for logIn 
  public async login(email, password) {
    let body = { email: email, password: password };
    let response = await this.httpClient.post(`${Config.API_BASE}/user/login`, body, Config.HEADERS).toPromise();
    return this.loginWithToken((<any>response).token);
  }

  //Im making this method for checking  Login Check
  public async isLoggedIn() {
    try {
      let token = localStorage.getItem('token');
      let response = await this.httpClient.post(`${Config.API_BASE}/user/login/check`, { token: token }, Config.HEADERS).toPromise();
      if ((<any>response).authenticated) {
        await this.getProfile(token);
        this.isLogin = true;
        return true;
      }
      else return false;
    } catch (error) {
      return false;
    }
  }

  //done

  public async getProfile(token) {
    try {
      let body = { token: token };
      let response = await this.httpClient.post(`${Config.API_BASE}/user/profile`, body, Config.HEADERS).toPromise();
      this.profile = <any>response;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async loginWithToken(token) {
    localStorage.setItem("token", token);
    (<any>$('#login-modal')).modal('hide');
    await this.getProfile(token);
    if (this.profile.username == null || this.profile.userType == null) {
      this.router.navigate(['/select-type']);
    }
    else if (this.profile.profileWizardTotalSteps - this.profile.profileWizardStep > 0) {
      this.navigateToWizard();
    }
    this.isLogin = true;
  }

  //upDate User name
  public updateUserName(userId, username, password) {
    let body = { userId: userId, username: username, password: password };
    let response = this.httpClient.put(`${Config.API_BASE}/user/username`, body, Config.HEADERS).toPromise();
    return response;
  }

  //upDate User Type
  public updateUserType(userId, userType) {

    let body = { userId: userId, userType: userType };
    let response = this.httpClient.put(`${Config.API_BASE}/user/usertype`, body, Config.HEADERS).toPromise();
    return response;
  }

  //Log out 
  public logout() {
    try {
      let response = this.httpClient.get(`${Config.API_BASE}/user/logout?userId=${this.profile._id}`, Config.HEADERS).toPromise();
      localStorage.removeItem("token");
      this.router.navigate(['/']);
      this.isLogin = false;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAuthState(user) {
    let response = await this.httpClient.post(`${Config.API_BASE}/user/login/social`, user).toPromise();
    return this.loginWithToken((<any>response).token);
  }

  private navigateToWizard() {
    if (this.profile.userType == 'inspector') {
      this.router.navigate(['/inspector/wizard']);
    }
    else if (this.profile.userType == 'lawyer') {
      this.router.navigate(['/lawyer/wizard']);
    }
  }
}