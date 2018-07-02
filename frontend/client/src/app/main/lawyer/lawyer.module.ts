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
    path: "service",
    loadChildren: './manage-service/manage-service.module#ManageServiceModule'
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
