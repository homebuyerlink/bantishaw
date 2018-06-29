import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LawyerService } from '../../../services/lawyer.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {
  constructor(private lawyerService: LawyerService,private authService:AuthenticationService) { }
  ngOnInit() {
  }
  submitEditServices(editFormServices: NgForm) {
    console.log(editFormServices);
    let name= editFormServices.value['name'];
    let image = editFormServices.value['image'];
    let price = editFormServices.value['price'];
    let promo = editFormServices.value['promo'];
    // this.lawyerService.updatelawyerService(id,name,image,price,promo);
  }
}