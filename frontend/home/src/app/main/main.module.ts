import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { DefaultdashboardComponent } from './defaultdashboard/defaultdashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent, DefaultdashboardComponent]
})
export class MainModule { }
