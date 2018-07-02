import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageServiceComponent } from './manage-service.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: "",
    component: ManageServiceComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  declarations: [ManageServiceComponent]
})
export class ManageServiceModule { }
