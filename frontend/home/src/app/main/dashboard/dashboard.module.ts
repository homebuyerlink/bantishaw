import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DefaultdashboardComponent } from './defaultdashboard/defaultdashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MyagentsComponent } from './myagents/myagents.component';
import { ServicesComponent } from './services/services.component';
import { Routes, RouterModule } from '@angular/router';
const routes:Routes=[
  {
    path:"",
    component:DashboardComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, DefaultdashboardComponent, SettingsComponent, MyprofileComponent, MyagentsComponent, ServicesComponent]
})
export class DashboardModule { }
