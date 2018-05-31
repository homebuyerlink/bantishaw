import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { Routes, RouterModule } from '@angular/router';
import { BooknowComponent } from './booknow/booknow.component';
const routes: Routes = [
  {
    path: "",
    component: ServicesComponent
  },
  {
    path: "book-now",
    component: BooknowComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicesComponent, BooknowComponent]
})
export class ServicesModule { }
