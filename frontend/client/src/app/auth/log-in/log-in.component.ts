import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Utils } from '../../utils';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  public loading = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  public async login(loginForm: NgForm) {
    this.loading = true;
    if (loginForm.valid) {
      try {
        await this.authService.login(loginForm.value.email, loginForm.value.password);
       
      } catch (error) {
        
      }
    }
    this.loading = false;
  }
}