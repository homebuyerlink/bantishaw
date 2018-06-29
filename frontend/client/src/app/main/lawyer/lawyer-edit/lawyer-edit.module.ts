import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EditTimeslotComponent } from './edit-timeslot/edit-timeslot.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { TagInputModule } from 'ngx-chips';

const routes: Routes = [
  {
    path: "company-details",
    component: EditCompanyComponent
  },
  {
    path: "service",
    component: EditServiceComponent
  },
  {
    path: "timeslot",
    component: EditTimeslotComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    FileUploadModule,
    TagInputModule
  ],
  declarations: [EditCompanyComponent, EditServiceComponent, EditTimeslotComponent]
})
export class LawyerEditModule { }
