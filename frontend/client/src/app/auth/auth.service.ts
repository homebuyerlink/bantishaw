import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Config } from '../config';
import { Utils } from '../utils';
import { Token } from '@angular/compiler';

@Injectable()


export class AuthService {

  public profile = {

    _id: '',
    name: '',
    email: '',
    password: '',
    authToken: '',
    createdAt: '',
    updatedAt: '',
    userType: "admin"
  }
  constructor(private httpClient: HttpClient, private router: Router) { }
  //for logIn 

  public async login(email, password) {
    let body = { email: email, password: password };
    let response = await this.httpClient.post(`${Config.API_BASE}/admin/login`, body, Config.HEADERS).toPromise();
    return this.loginWithToken((<any>response).token);
  }

  // public async isLoggedIn() {
  //   try {
  //     let token = localStorage.getItem('token');
  //     let response = await this.httpClient.post(`${Config.API_BASE}/user/login/check`, { token: token }, Config.HEADERS).toPromise();
  //     if ((<any>response).authenticated) {
  //       await this.getProfile(token);
  //       return true;
  //     }
  //     else return false;
  //   } catch (error) {
  //     return false;
  //   }
  // }

  //Im making this method for checking Admin Login Check
  public async isLoggedIn() {
    try {
      let token = localStorage.getItem('token');
      let response = await this.httpClient.post(`${Config.API_BASE}/admin/login/check`, { token: token }, Config.HEADERS).toPromise();
      if ((<any>response).authenticated) {
        await this.getProfile(token);

        return true;
      }
      else return false;
    } catch (error) {

      Utils.notification("Error Occured", "error");

    }
  }
  //done
  public async getProfile(token) {
    try {
      let response = await this.httpClient.post(`${Config.API_BASE}/admin/profile`, { token: token }, Config.HEADERS).toPromise();
      this.profile = <any>response;
    } catch (error) {
      Utils.handleAuthError(error);
    }
  }

  public loginWithToken(token) {
    localStorage.setItem("token", token);
    this.router.navigate(['/']);
  }

  public logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  //Sign Up
  public async signup(name, email, password) {
    let body = { name: name, email: email, password: password };

    let response = await this.httpClient.post(`${Config.API_BASE}/admin`, body, Config.HEADERS).toPromise();

    // console.log(Token)
    return this.loginWithToken((<any>response).token);
  }

  // public changePassword(id, password) {
  //   let body = { id: id, password: password }
  //   return this.httpClient.put(`${Config.API_BASE}/admin/change-password`, body, Config.HEADERS).toPromise();
  // }

}