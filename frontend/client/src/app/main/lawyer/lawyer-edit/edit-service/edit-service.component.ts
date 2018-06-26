import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { Config } from './../../../../config';
import { InspectorService } from '../../../../services/inspector.service';
import { Utils } from '../../../../utils';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  public servicesFormStep3: FormGroup;

  constructor(private _fb: FormBuilder, private authservice: AuthenticationService, private inspectorService: InspectorService) { }

  ngOnInit() {
    this.servicesFormStep3 = new FormGroup({
      'servicesArray': this._fb.array([this.initinspectorServicesDetail()])
    });
  }

  initinspectorServicesDetail() {
    return this._fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      promo: ['', Validators.required],
      details: ['', Validators.required],
    });
  }
  addMoreDetailStep3() {
    const control = <FormArray>this.servicesFormStep3.controls['servicesArray'];
    control.push(this.initinspectorServicesDetail());
  }

  async saveServices() {
    Utils.showLoader('#serviceForm');
    try {
      let services = this.servicesFormStep3.value['servicesArray'];
      let obj = {
        userId: this.authservice.profile._id,
        services: services
      };
      console.log(obj);

      // await this.inspectorService.setServicesDetails(obj);
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#serviceForm');
  }

}
