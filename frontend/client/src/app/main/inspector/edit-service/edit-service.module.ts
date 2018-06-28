import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditServiceComponent } from './edit-service.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: "",
    component: EditServiceComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), FormsModule, ReactiveFormsModule
  ],
  declarations: [EditServiceComponent]
})
export class EditServiceModule { }
