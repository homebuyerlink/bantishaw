import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerWizardComponent } from './lawyer-wizard.component';
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { TagInputModule } from 'ngx-chips';

const routes: Routes = [
  {
    path: "",
    component: LawyerWizardComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    FormsModule,
    FileUploadModule,
    TagInputModule
  ],
  declarations: [LawyerWizardComponent]
})
export class LawyerWizardModule { }
