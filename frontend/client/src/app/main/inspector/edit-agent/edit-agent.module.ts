import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAgentComponent } from './edit-agent.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
const routes: Routes = [
  {
    path: "",
    component: EditAgentComponent
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
  declarations: [EditAgentComponent]
})
export class EditAgentModule { }
