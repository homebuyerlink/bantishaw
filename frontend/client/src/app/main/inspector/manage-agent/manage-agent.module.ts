import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAgentComponent } from './manage-agent.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: "",
    component: ManageAgentComponent
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
  declarations: [ManageAgentComponent]
})
export class ManageAgentModule { }
