import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-inspector-dashboard',
  templateUrl: './inspector-dashboard.component.html',
  styleUrls: ['./inspector-dashboard.component.css']
})
export class InspectorDashboardComponent implements OnInit {

  constructor(public authService:AuthenticationService) { }

  ngOnInit() {
  }

}
