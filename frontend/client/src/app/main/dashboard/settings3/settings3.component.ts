import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, EmailValidator, FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings3',
  templateUrl: './settings3.component.html',
  styleUrls: ['./settings3.component.css']
})
export class Settings3Component implements OnInit {

  public inspectorDetailFormStep3: FormGroup;
  constructor(private _fb: FormBuilder) { }


  ngOnInit() {
    let ctrl = new FormControl(null, Validators.required);
    this.inspectorDetailFormStep3=new FormGroup({
      
      'inspectorDetailArrayStep3':this._fb.array([this.initinspectorDetail3rd()])

    })
    
  }
  initinspectorDetail3rd() {
    return this._fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      promo: ['', Validators.required],
      details:['',Validators.required],
     
    });
  }
  addMoreDetailStep3() {
    const control = <FormArray>this.inspectorDetailFormStep3.controls['inspectorDetailArrayStep3'];
    control.push(this.initinspectorDetail3rd());
  }
  removeAddress(i: number) {
    const control = <FormArray>this.inspectorDetailFormStep3.controls['inspectorDetailArrayStep3'];
    control.removeAt(i);
  }
  saveStep3() {
    let values = this.inspectorDetailFormStep3.value['inspectorDetailArrayStep3'];
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
