import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectorWizardComponent } from './inspector-wizard.component';
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { TagInputModule } from 'ngx-chips';

const routes: Routes = [
  {
    path: "",
    component: InspectorWizardComponent
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
  declarations: [InspectorWizardComponent]
})
export class InspectorWizardModule { }
