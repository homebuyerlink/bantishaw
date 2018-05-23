import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeownersComponent } from './homeowners/homeowners.component';
import { ProfessionalsComponent } from './professionals/professionals.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeownersComponent, ProfessionalsComponent]
})
export class CommunityModule { }
