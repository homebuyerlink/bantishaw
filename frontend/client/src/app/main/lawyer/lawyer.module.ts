import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "wizard",
    loadChildren: './lawyer-wizard/lawyer-wizard.module#LawyerWizardModule',
  },
  {
    path: "profile/:slug",
    loadChildren: './lawyer-profile/lawyer-profile.module#LawyerProfileModule',
  },
  {
    path: "dashboard",
    loadChildren: './lawyer-dashboard/lawyer-dashboard.module#LawyerDashboardModule',
  },
  {
    path: "edit",
    loadChildren: './lawyer-edit/lawyer-edit.module#LawyerEditModule'
  },
  {
    path: "edit-services",
    loadChildren: './edit-services/edit-services.module#EditServicesModule'
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class LawyerModule { }
