import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectorComponent } from './inspector.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { TagInputModule } from 'ngx-chips'
const routes: Routes = [
  {
    path: "",
    component: InspectorComponent
  }]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    TagInputModule
  ],
  declarations: [InspectorComponent]
})
export class InspectorModule { }
