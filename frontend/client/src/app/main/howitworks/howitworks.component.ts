import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-howitworks',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.css']
})
export class HowitworksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  forProfessionals() {
    $('html, body').animate({
      scrollTop: $("#two").offset().top - 150
    }, 2000);
  }
}
