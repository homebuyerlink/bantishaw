import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
import { AddblogComponent } from './addblog/addblog.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { SingleblogbetailComponent } from './singleblogbetail/singleblogbetail.component';
const routes: Routes = [
  {
    path: "",
    component: BlogComponent
  },
  {
    path: "add-blog",
    component: AddblogComponent
  },
  {
    path: "my-blogs",
    component: MyblogsComponent
  }
  ,
  {
    path: "detail",
    component: SingleblogbetailComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogComponent, AddblogComponent, MyblogsComponent, SingleblogbetailComponent]
})
export class BlogModule { }
