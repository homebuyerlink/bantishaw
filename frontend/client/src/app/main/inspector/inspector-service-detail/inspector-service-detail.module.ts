import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectorServiceDetailComponent } from './inspector-service-detail.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 const router:Routes=[
 {
   path:"",
   component:InspectorServiceDetailComponent
 }
 ]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [InspectorServiceDetailComponent]
})
export class InspectorServiceDetailModule { }
