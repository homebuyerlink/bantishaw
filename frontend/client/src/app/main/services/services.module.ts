import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: "",
    component: ServicesComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicesComponent]
})
export class ServicesModule { }
