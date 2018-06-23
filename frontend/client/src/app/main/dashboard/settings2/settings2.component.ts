import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, EmailValidator, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings2',
  templateUrl: './settings2.component.html',
  styleUrls: ['./settings2.component.css']
})
export class Settings2Component implements OnInit {
  public inspectorDetailForm: FormGroup;
  constructor(private _fb: FormBuilder) { }


  ngOnInit() {
    let ctrl = new FormControl(null, Validators.required);
    this.inspectorDetailForm=new FormGroup({
      
      'inspectorDetailArray':this._fb.array([this.initinspectorDetail()])

    })
    // this.inspectorDetailForm = this._fb.group({
    //   inspectorDetailArray: this._fb.array([
    //     this.initinspectorDetail(),
    //   ])
    // });
  }
  initinspectorDetail() {
    return this._fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', Validators.required, EmailValidator],
      phone: ['', Validators.required],
      image:[Validators.required],
     
    });
  }
  addMoreDetail() {
    const control = <FormArray>this.inspectorDetailForm.controls['inspectorDetailArray'];
    control.push(this.initinspectorDetail());
  }
  removeAddress(i: number) {
    const control = <FormArray>this.inspectorDetailForm.controls['inspectorDetailArray'];
    control.removeAt(i);
  }
  save() {
    let values = this.inspectorDetailForm.value['inspectorDetailArray'];
    console.log(values);
    // const val: Array<any> = [
    //   // this.purchaseForm.value['sD'],
    //   // this.purchaseForm.value['ref'],
    //   // this.purchaseForm.value['pL'],
    //   // this.purchaseForm.value['email'],
    //   this.purchaseForm.value['newRowArray']
    // ]
    // console.log(JSON.stringify(val));
    // console.log(this.purchaseForm.valid);
  }
}