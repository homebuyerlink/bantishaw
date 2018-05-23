import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { PartialModule } from '../partial/partial.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    PartialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainComponent]
})
export class MainModule { }
