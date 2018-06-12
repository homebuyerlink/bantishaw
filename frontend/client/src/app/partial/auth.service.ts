import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { Config } from '../config';
import { Utils } from '../utils';
import { Token } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class AuthService {

  public profile = {

    _id: '',
    name: '',
    email: '',
    password: '',
    authToken: '',
    createdAt: '',
    updatedAt: ''
  }
  constructor(private httpClient: HttpClient, private router: Router) { }

  //Sign Up
  public async signup(name, email, password) {
    let body = { name: name, email: email, password: password };

    let response = await this.httpClient.post(`${Config.API_BASE}/user/signup`, body, Config.HEADERS).toPromise();

    console.log(response)
    //return this.loginWithToken((<any>response).token);
  }


  //for logIn 

  public async login(email, password) {
    let body = { email: email, password: password };
    let response = await this.httpClient.post(`${Config.API_BASE}/user/login`, body, Config.HEADERS).toPromise();
    console.log(response);
    return this.loginWithToken((<any>response).token);

  }
  //Im making this method for checking  Login Check
  public async isLoggedIn() {
    try {
      let token = localStorage.getItem('token');
      let response = await this.httpClient.post(`${Config.API_BASE}/user/login/check`, { token: token }, Config.HEADERS).toPromise();
      if ((<any>response).authenticated) {
        await this.getProfile(token);
        return true;
      }
      else return false;
    } catch (error) {
      console.log(error);
    }
  }
  //done
  public async getProfile(token) {
    try {
      let body = { token: token };
      let response = await this.httpClient.post(`${Config.API_BASE}/user/profile`, body, Config.HEADERS).toPromise();
      this.profile = <any>response;
    } catch (error) {
      console.log(error);
    }
  }
  public loginWithToken(token) {
    localStorage.setItem("token", token);
  }

  public logout() {
    try {
      let response=localStorage.removeItem("token");
      this.router.navigate(['/']); 
    } catch (error) {
      console.log(error);
    }

  }

}