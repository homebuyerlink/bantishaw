import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageServiceComponent } from './manage-service.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    FileUploadModule
  ],
  declarations: [ManageServiceComponent]
})
export class ManageServiceModule { }
