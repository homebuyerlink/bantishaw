import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditServiceComponent } from './edit-service.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: "",
    component: EditServiceComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FileUploadModule
  ],
  declarations: [EditServiceComponent]
})
export class EditServiceModule { }
