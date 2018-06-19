import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserTypeGuard } from './guards/usertype.guard';
import { ServiceProviderGuard } from './guards/serviceprovider.guard';


const routes: Routes = [
  {
    path: "",
    loadChildren: './main/main.module#MainModule',
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AuthenticationService, AuthGuard, AuthGuard,UserTypeGuard,ServiceProviderGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
