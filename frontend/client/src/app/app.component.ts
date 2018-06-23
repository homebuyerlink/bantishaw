import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import * as $ from 'jquery'
import { AuthenticationService } from './services/authentication.service';
import { Utils } from './utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthenticationService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        Utils.blockPage();
        this.authService.isLoggedIn();
      }
      else if ((event instanceof NavigationEnd) || (event instanceof NavigationError) || (event instanceof NavigationCancel)) {
        Utils.unblockPage();
        this.scrollUp();
      }
    })
  }
  
  ngOnInit() {
    this.scrollUp();
  }
  
  scrollUp() {
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
}
