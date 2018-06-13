import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import  {HttpClientModule } from '@angular/common/http';
import { GuestheaderComponent } from './guestheader/guestheader.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    HttpClientModule
    
  ],
  declarations: [HeaderComponent, FooterComponent, GuestheaderComponent],
  
  exports:[HeaderComponent,FooterComponent]
})
export class PartialModule { }
