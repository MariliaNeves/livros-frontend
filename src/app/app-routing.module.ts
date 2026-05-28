import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuntosListComponent } from './app/pages/assuntos/assuntos-list/assuntos-list.component';
import { AssuntosFormComponent } from './app/pages/assuntos/assuntos-form/assuntos-form.component';
import { AutoresListComponent } from './app/pages/autores/autores-list/autores-list.component';
import { AutoresFormComponent } from './app/pages/autores/autores-form/autores-form.component';

 const routes: Routes = [                                                                                                                                               
    { path: 'assuntos', component: AssuntosListComponent },                                                                                                              
    { path: 'assuntos/novo', component: AssuntosFormComponent },                                                                                                         
    { path: 'assuntos/:id/editar', component: AssuntosFormComponent },
    { path: 'autores', component: AutoresListComponent },                                                                                                                  
    { path: 'autores/novo', component: AutoresFormComponent },                                                                                                             
    { path: 'autores/:id/editar', component: AutoresFormComponent },                                                                                                      
  ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
