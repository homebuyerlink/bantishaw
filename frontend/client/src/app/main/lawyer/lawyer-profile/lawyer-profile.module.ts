import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerProfileComponent } from './lawyer-profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: LawyerProfileComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LawyerProfileComponent]
})
export class LawyerProfileModule { }
