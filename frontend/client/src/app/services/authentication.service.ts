import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';
import { config } from 'rxjs';
declare var JQuery: any;
@Injectable()

export class AuthenticationService {

  public profile = {
    _id: '',
    username: '',
    userType: '',
    email: '',
    password: '',
    authToken: '',
    createdAt: '',
    updatedAt: '',
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
      // console.log(error);
    }
  }
  //done
  public async getProfile(token) {
    try {
      let body = { token: token };
      let response = await this.httpClient.post(`${Config.API_BASE}/user/profile`, body, Config.HEADERS).toPromise();
      this.profile = <any>response;
    } catch (error) {
    }
  }

  public loginWithToken(token) {
    localStorage.setItem("token", token);
    (<any>$('#login-modal')).modal('hide');
    this.getProfile(token);
    console.log(this.profile.username);
    console.log(this.profile.userType);
    
    if(this.profile.username===undefined || this.profile.userType===undefined){
      this.router.navigate(['/select-type']);
    }
    this.isLogin = true
  }
  //upDate User name

  public  updateUserName(userId, username) {
    let body = { userId: userId, username: username };   
    let response =  this.httpClient.put(`${Config.API_BASE}/user/username`, body, Config.HEADERS).toPromise();
    return response;
  }

  //upDate User Type

  public  updateUserType(userId, userType) {
   
    let body = { userId: userId, userType: userType };
    let response =  this.httpClient.put(`${Config.API_BASE}/user/usertype`, body, Config.HEADERS).toPromise();
    return response;
  }
  //Log out 
  public logout() {
    try {
      let response = localStorage.removeItem("token");
      this.router.navigate(['/']);
      this.isLogin = false;
    } catch (error) {
      console.log(error);
    }
  }
  public async getAuthState(user) {
    let response = await this.httpClient.post(`${Config.API_BASE}/user/login/social`, user).toPromise();
    return this.loginWithToken((<any>response).token);
  }
}