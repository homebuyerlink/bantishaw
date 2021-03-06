import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserTypeGuard } from './guards/usertype.guard';
import { ServiceProviderGuard } from './guards/serviceprovider.guard';
import { InspectorService } from './services/inspector.service';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { inspectrGuard } from './guards/inspector.guard';
import { TokenInterceptor } from './partial/token.interceptor';
import { WizardGuard } from './guards/wizard.guard';
const routes: Routes = [
  {
    path: "",
    loadChildren: './main/main.module#MainModule'
    // canActivate:[UserTypeGuard]
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
    HttpClientModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    InspectorService,
    inspectrGuard,
    AuthenticationService,
    AuthGuard,
    UserTypeGuard,
    ServiceProviderGuard,
    WizardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
