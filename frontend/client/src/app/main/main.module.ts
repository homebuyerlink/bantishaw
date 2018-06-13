import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { PartialModule } from '../partial/partial.module';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: "services",
        loadChildren: './services/services.module#ServicesModule'
      },
      {
        path: "how-it-works",
        loadChildren: './howitworks/howitworks.module#HowitworksModule'
      },
      {
        path: "post-ad",
        loadChildren: './postad/postad.module#PostadModule'
      },
      {
        path: "blog",
        loadChildren: './blog/blog.module#BlogModule'
      }
      ,
      {
        path: "dashboard",
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate:[AuthGuard]
      
      },
      {
        path: "faq",
        component: FaqComponent
      }
      ,
      {
        path: "product-detail",
        component: ProductdetailComponent
      }
    ]
  }
]

@NgModule({

  imports: [
    CommonModule,
    PartialModule,
    RouterModule.forChild(routes)
  ],

  declarations: [MainComponent, FaqComponent, ProductdetailComponent]

})
export class MainModule { }
