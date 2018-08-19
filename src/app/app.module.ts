import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing/app-routing.module';


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserModule } from './user/user.module';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomescreenComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }