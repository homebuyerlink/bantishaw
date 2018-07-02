import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-lawyer-dashboard',
  templateUrl: './lawyer-dashboard.component.html',
  styleUrls: ['./lawyer-dashboard.component.css']
})
export class LawyerDashboardComponent implements OnInit {
  constructor(public authService:AuthenticationService) { }
  ngOnInit() {
  }
}
