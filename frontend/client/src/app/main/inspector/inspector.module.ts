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
  {
    path: "agent",
    loadChildren: './manage-agent/manage-agent.module#ManageAgentModule'
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
export class InspectorModule { }
