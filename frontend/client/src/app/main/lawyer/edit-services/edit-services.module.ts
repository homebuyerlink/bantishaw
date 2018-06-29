import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditServicesComponent } from './edit-services.component';
import {  RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:"",
    component:EditServicesComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EditServicesComponent]
})
export class EditServicesModule { }
