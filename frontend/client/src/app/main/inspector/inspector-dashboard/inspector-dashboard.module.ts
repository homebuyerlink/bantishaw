import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectorDashboardComponent } from './inspector-dashboard.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: InspectorDashboardComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InspectorDashboardComponent]
})
export class InspectorDashboardModule { }
