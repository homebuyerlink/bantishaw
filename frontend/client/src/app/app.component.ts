import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import * as $ from 'jquery'
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthenticationService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        var body = $("html, body");
        body.stop().animate({ scrollTop: 0 }, 1000, 'swing', function () {
        });
        this.authService.isLoggedIn();
      }
      else if ((event instanceof NavigationEnd) || (event instanceof NavigationError) || (event instanceof NavigationCancel)) {

        var body = $("html, body");
        body.stop().animate({ scrollTop: 0 }, 1000, 'swing', function () {
        });

      }
    })
  }
  title = 'app';
  ngOnInit() {
    this.scrollUp();
  }
  scrollUp() {
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
}
