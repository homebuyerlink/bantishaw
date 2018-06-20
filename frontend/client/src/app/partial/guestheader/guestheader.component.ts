import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-guestheader',
  templateUrl: './guestheader.component.html',
  styleUrls: ['./guestheader.component.css']
})

export class GuestheaderComponent implements OnInit {

  public loggedIn: boolean = false;

  constructor(private authService: AuthenticationService) { }

  async  ngOnInit() {
   
  }


}