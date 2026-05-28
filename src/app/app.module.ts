import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AssuntosListComponent } from './app/pages/assuntos/assuntos-list/assuntos-list.component';
import { AssuntosFormComponent } from './app/pages/assuntos/assuntos-form/assuntos-form.component';
import { AutoresListComponent } from './app/pages/autores/autores-list/autores-list.component';
import { AutoresFormComponent } from './app/pages/autores/autores-form/autores-form.component';
import { LivrosListComponent } from './app/pages/livros/livros-list/livros-list.component';
import { LivrosFormComponent } from './app/pages/livros/livros-form/livros-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AssuntosListComponent,
    AssuntosFormComponent,
    AutoresListComponent,
    AutoresFormComponent,
    LivrosListComponent,
    LivrosFormComponent
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
