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
import { FormsModule } from '@angular/forms';
import { UserTypeGuard } from '../../guards/usertype.guard';
import { ServiceProviderGuard } from '../../guards/serviceprovider.guard';


const routes:Routes=[
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"edit-profile",
    component:MyprofileComponent,
    canActivate:[UserTypeGuard]
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
    component:SettingsComponent,
    canActivate:[UserTypeGuard]
  }
  ,
  {
    path:"charity-view",
    component:CharityViewComponent,
    
    canActivate:[UserTypeGuard]
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
    component:AgentsComponent,
    canActivate:[ServiceProviderGuard]
  }
  ,
  {
    path:"services",
    component:ServicesComponent,
    canActivate:[ServiceProviderGuard]
  }
  ,
  {
    path:"add-agent",
    component:AddagestsComponent
  }
  ,
  {
    path:"add-service",
    component:AddservicesComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [DashboardComponent, DefaultdashboardComponent, SettingsComponent, MyprofileComponent,  ServicesComponent, ViewbookingsComponent, HblboxComponent, CharityViewComponent, MyfavouritesComponent, AddbookingsComponent, AgentsComponent, AddagestsComponent, AddservicesComponent]
})
export class DashboardModule { }