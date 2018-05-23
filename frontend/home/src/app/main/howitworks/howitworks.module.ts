import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { ProfessionalsComponent } from './professionals/professionals.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomersComponent, ProfessionalsComponent]
})
export class HowitworksModule { }
