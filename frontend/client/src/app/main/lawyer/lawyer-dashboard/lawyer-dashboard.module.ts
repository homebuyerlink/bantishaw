import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerDashboardComponent } from './lawyer-dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LawyerDashboardComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LawyerDashboardComponent]
})
export class LawyerDashboardModule { }
