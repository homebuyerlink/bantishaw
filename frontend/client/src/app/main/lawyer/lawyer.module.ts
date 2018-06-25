import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "wizard",
    loadChildren: './wizard/wizard.module#WizardModule',
  },
  {
    path: "profile/:slug",
    loadChildren: './lawyer-profile/lawyer-profile.module#LawyerProfileModule',
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class LawyerModule { }
