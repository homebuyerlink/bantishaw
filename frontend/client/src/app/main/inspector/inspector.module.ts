import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectorComponent } from './inspector.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
    FormsModule
  ],
  declarations: [InspectorComponent]
})
export class InspectorModule { }
