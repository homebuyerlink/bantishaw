import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WizardGuard } from '../../guards/wizard.guard';

const routes: Routes = [
  {
    path: "wizard",
    loadChildren: './inspector-wizard/inspector-wizard.module#InspectorWizardModule'
  },
  {
    path: "profile/:slug",
    loadChildren: './inspector-profile/inspector-profile.module#InspectorProfileModule',
    canActivate: [WizardGuard]
  },
  {
    path: "dashboard",
    loadChildren: './inspector-dashboard/inspector-dashboard.module#InspectorDashboardModule'
  },
  {
    path: "edit",
    loadChildren: './inspector-edit/inspector-edit.module#InspectorEditModule'
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class InspectorModule { }
