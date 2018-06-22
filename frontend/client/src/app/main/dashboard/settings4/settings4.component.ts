import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-settings4',
  templateUrl: './settings4.component.html',
  styleUrls: ['./settings4.component.css']
})
export class Settings4Component implements OnInit {

  public inspectorDetailFormStep4: FormGroup;
  constructor(private _fb: FormBuilder) { }


  ngOnInit() {
    let ctrl = new FormControl(null, Validators.required);
    this.inspectorDetailFormStep4 = new FormGroup({
      'mondaySchedule': this._fb.array([this.initmondaySchedule()]),
      'tuesdaySchedule': this._fb.array([this.initTuesdaySchedule()]),
      'wednesdaySchedule': this._fb.array([this.initWednesdaySchedule()]),
      'thursdaySchedule': this._fb.array([this.initThursdaySchedule()]),
      'firdaySchedule': this._fb.array([this.initFridaySchedule()]),
      'saturdaySchedule': this._fb.array([this.initSaturdaySchedule()]),
      'sundaySchedule': this._fb.array([this.initSundaySchedule()])
    });
  }
  //monday block
  initmondaySchedule() {
    return this._fb.group({
      mondayStartTime: ['', Validators.required],
      mondayEndTime: ['', Validators.required]

    });
  }
  addMoretoMondaySchedule() {
    const control = <FormArray>this.inspectorDetailFormStep4.controls['mondaySchedule'];
    control.push(this.initmondaySchedule());
  }
//tuesday block
initTuesdaySchedule() {
  return this._fb.group({
    tuesdayStartTime: ['', Validators.required],
    tuesdayEndTime: ['', Validators.required]
  });
}
addMoretoTuesdaySchedule() {
  const control = <FormArray>this.inspectorDetailFormStep4.controls['tuesdaySchedule'];
  control.push(this.initTuesdaySchedule());
}


//wednesday block
initWednesdaySchedule() {
  return this._fb.group({
    wednesdayStartTime: ['', Validators.required],
    wednesdayEndTime: ['', Validators.required]
  });
}
addMoretoWednesdaySchedule() {
  const control = <FormArray>this.inspectorDetailFormStep4.controls['wednesdaySchedule'];
  control.push(this.initWednesdaySchedule());
}
//thursday block
initThursdaySchedule() {
  return this._fb.group({
    thursdayStartTime: ['', Validators.required],
    thursdayEndTime: ['', Validators.required]
  });
}
addMoretoThursdaySchedule() {
  const control = <FormArray>this.inspectorDetailFormStep4.controls['thursdaySchedule'];
  control.push(this.initThursdaySchedule());
}
//friday block
initFridaySchedule() {
  return this._fb.group({
    firdayStartTime: ['', Validators.required],
    firdayEndTime: ['', Validators.required]
  });
}
addMoretoFridaySchedule() {
  const control = <FormArray>this.inspectorDetailFormStep4.controls['firdaySchedule'];
  control.push(this.initFridaySchedule());
}
//saturday block
initSaturdaySchedule() {
  return this._fb.group({
    saturdayStartTime: ['', Validators.required],
    saturdayEndTime: ['', Validators.required]
  });
}
addMoretoSaturdaySchedule() {
  const control = <FormArray>this.inspectorDetailFormStep4.controls['saturdaySchedule'];
  control.push(this.initSaturdaySchedule());
}
//sunday block
initSundaySchedule() {
  return this._fb.group({
    sundayStartTime: ['', Validators.required],
    sundayEndTime: ['', Validators.required]
  });
}
addMoretoSundaySchedule() {
  const control = <FormArray>this.inspectorDetailFormStep4.controls['sundaySchedule'];
  control.push(this.initSundaySchedule());
}
}
