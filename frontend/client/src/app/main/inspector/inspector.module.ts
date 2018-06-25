import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "wizard",
    loadChildren: './inspector-wizard/inspector-wizard.module#InspectorWizardModule'
  },
  {
    path: "profile/:slug",
    loadChildren: './inspector-profile/inspector-profile.module#InspectorProfileModule'
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
