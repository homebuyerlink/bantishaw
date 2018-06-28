import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { Config } from './../../../../config';
import { InspectorService } from '../../../../services/inspector.service';
import { Utils } from '../../../../utils';

@Component({
  selector: 'app-edit-inspector',
  templateUrl: './edit-inspector.component.html',
  styleUrls: ['./edit-inspector.component.css']
})
export class EditInspectorComponent implements OnInit {

  public inspectorDetailForm: FormGroup;
  public URL = `${Config.API_BASE}/utils/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
  });
  public image = '';
  inspectorCompanyDetails = {
    "_id": null,
    "slug": null,
    "name": null,
    "addressLine1": null,
    "addressLine2": null,
    "city": null,
    "state": null,
    "zip": null,
    "phone": null,
    "email": null,
    "website": null,
    "founded": null,
    "image": null,
    "lat": null,
    "lng": null,
    "radius": null,
    "userId": null,
    "createdAt": null,
    "updatedAt": null,
    "__v": null,
    "user": {
      "_id": null,
      "isActive": null,
      "isEmailVerified": null,
      "profileWizardStep": null,
      "profileWizardTotalSteps": null,
      "email": null,
      "name": null,
      "photoUrl": null,
      "provider": null,
      "createdAt": null,
      "updatedAt": null,
      "__v": null,
      "token": null,
      "username": null,
      "userType": null
    },
    "tags": [],
    "team": [],
    "services": [],
    "social": []
  }

  constructor(private _fb: FormBuilder, private authservice: AuthenticationService, private inspectorService: InspectorService) { }

  ngOnInit() {
    this.getInspectorCompanyDetailsById();
    this.inspectorDetailForm = new FormGroup({
      'tags': new FormControl('', Validators.required),
      'inspectorDetailArray': this._fb.array([this.initinspectorDetail()],
      )
    });
  }

  initinspectorDetail() {
    return this._fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  addMoreDetail() {
    const control = <FormArray>this.inspectorDetailForm.controls['inspectorDetailArray'];
    control.push(this.initinspectorDetail());
  }

  async saveInspectorDetail() {
    Utils.showLoader('#inspectorForm');
    try {
      let teamMembers = this.inspectorDetailForm.value['inspectorDetailArray'];
      let tags = this.inspectorDetailForm.value.tags;
      let obj = {
        userId: this.authservice.profile._id,
        teamMembers: teamMembers,
        tags: tags
      };
      console.log(obj);
      
      // await this.inspectorService.setInspectorDetails(obj);
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#inspectorForm');
  }

  async getInspectorCompanyDetailsById() {
    Utils.showLoader('#agentDetais');
    try {
      this.inspectorCompanyDetails = (<any>await this.inspectorService.getInspectorCompanyById());
      console.log(this.inspectorCompanyDetails);
      
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('#agentDetais');
  }

}
