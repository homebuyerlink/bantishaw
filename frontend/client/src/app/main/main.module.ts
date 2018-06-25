import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { PartialModule } from '../partial/partial.module';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AuthGuard } from '../guards/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SelectUserTypeComponent } from './select-user-type/select-user-type.component';
import { UserTypeGuard } from '../guards/usertype.guard';
import { FormsModule } from '@angular/forms';
import { inspectrGuard } from '../guards/inspector.guard';
import { WizardGuard } from '../guards/wizard.guard';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        loadChildren: './home/home.module#HomeModule',
        canActivate: [WizardGuard]
      },
      {
        path: "services",
        loadChildren: './services/services.module#ServicesModule',
        canActivate: [UserTypeGuard]
      },
      {
        path: "how-it-works",
        loadChildren: './howitworks/howitworks.module#HowitworksModule'
      },
      {
        path: "post-ad",
        loadChildren: './postad/postad.module#PostadModule',
        canActivate: [AuthGuard, UserTypeGuard]
      },
      {
        path: "inspector",
        loadChildren: './inspector/inspector.module#InspectorModule',
        canActivate: [AuthGuard, UserTypeGuard, inspectrGuard]
      },
      {
        path: "lawyer",
        loadChildren: './lawyer/lawyer.module#LawyerModule',
        canActivate: [AuthGuard]
      },
      {
        path: "blog",
        loadChildren: './blog/blog.module#BlogModule'
      }
      ,
      {
        path: "dashboard",
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard, UserTypeGuard]

      },
      {
        path: "faq",
        component: FaqComponent
      }
      ,
      {
        path: "product-detail",
        component: ProductdetailComponent
      },
      {
        path: "unauthorized",
        component: UnauthorizedComponent
      },
      {
        path: "select-type",
        component: SelectUserTypeComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({

  imports: [
    CommonModule,
    PartialModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [
    WizardGuard
  ],

  declarations: [MainComponent, FaqComponent, ProductdetailComponent, UnauthorizedComponent, SelectUserTypeComponent]

})
export class MainModule { }
