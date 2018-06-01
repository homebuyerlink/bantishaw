import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DefaultdashboardComponent } from './defaultdashboard/defaultdashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

import { ServicesComponent } from './services/services.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { HblboxComponent } from './hblbox/hblbox.component';
import { CharityViewComponent } from './charity-view/charity-view.component';
import { MyfavouritesComponent } from './myfavourites/myfavourites.component';
import { AddbookingsComponent } from './addbookings/addbookings.component';
import { AgentsComponent } from './agents/agents.component';
import { AddagestsComponent } from './addagests/addagests.component';
import { AddservicesComponent } from './addservices/addservices.component';

const routes:Routes=[
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"edit-profile",
    component:MyprofileComponent
  },
  {
    path:"view-bookings",
    component:ViewbookingsComponent
  }
  ,
  {
    path:"hbl-box",
    component:HblboxComponent
  } ,
  {
    path:"settings",
    component:SettingsComponent
  }
  ,
  {
    path:"charity-view",
    component:CharityViewComponent
  }
  ,
  {
    path:"my-favourites",
    component:MyfavouritesComponent
  }
  ,
  {
    path:"add-booking",
    component:AddbookingsComponent
  
  }
  ,
  {
    path:"agents",
    component:AgentsComponent
  },
  {
    path:"services",
    component:ServicesComponent
  }
  ,
  {
    path:"add-agent",
    component:AddagestsComponent
  },
  {
    path:"add-service",
    component:AddservicesComponent
  }
  
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, DefaultdashboardComponent, SettingsComponent, MyprofileComponent,  ServicesComponent, ViewbookingsComponent, HblboxComponent, CharityViewComponent, MyfavouritesComponent, AddbookingsComponent, AgentsComponent, AddagestsComponent, AddservicesComponent]
})
export class DashboardModule { }
