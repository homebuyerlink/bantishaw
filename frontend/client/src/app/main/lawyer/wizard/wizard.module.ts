import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { TagInputModule } from 'ngx-chips';

const routes: Routes = [
  {
    path: "",
    component: WizardComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    FileUploadModule,
    TagInputModule
  ],
  declarations: [WizardComponent]
})
export class WizardModule { }
