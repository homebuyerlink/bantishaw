import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
scrolMeUp(){
  var body = $("html, body");
  body.stop().animate({ scrollTop: 0 }, 500, 'swing', function () {
  });
}
}
