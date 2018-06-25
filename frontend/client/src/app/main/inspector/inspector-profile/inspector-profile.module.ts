import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectorProfileComponent } from './inspector-profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: InspectorProfileComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InspectorProfileComponent]
})
export class InspectorProfileModule { }
