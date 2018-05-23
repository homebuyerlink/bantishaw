import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowitworksComponent } from './howitworks.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: "",
    component: HowitworksComponent
  }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HowitworksComponent]
})
export class HowitworksModule { }
