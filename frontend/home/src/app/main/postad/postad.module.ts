import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostadComponent } from './postad.component';
import { Routes, RouterModule } from '@angular/router';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step1Component } from './step1/step1.component';

const routes: Routes = [
  {
    path: "",
    component: PostadComponent,
    children: [
      {
        path:"",
        component:Step1Component
      }
      ,
      {
        path: "step-2",
        component: Step2Component
      },
      {
        path: "step-3",
        component: Step3Component
      },
      {
        path: "step-4",
        component: Step4Component
      }

    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostadComponent, Step2Component, Step3Component, Step4Component, Step1Component]
})

export class PostadModule { }
