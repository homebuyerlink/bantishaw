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
  public allServices=[];

  selectedService = {

    "name": null,
    "image": null,
    "price":null,
    "promo":null 
  }
  constructor(private lawyerService: LawyerService,private authService:AuthenticationService) { }
  async  ngOnInit() {
  let response=await this.lawyerService.getInspectorCompanyById();
  this.allServices=<any>response;
  console.log(this.allServices);
  }
  
  getAgentId(value) {
    this.selectedService = value;
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