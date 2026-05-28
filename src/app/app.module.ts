import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AssuntosListComponent } from './app/pages/assuntos/assuntos-list/assuntos-list.component';
import { AssuntosFormComponent } from './app/pages/assuntos/assuntos-form/assuntos-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AssuntosListComponent,
    AssuntosFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
