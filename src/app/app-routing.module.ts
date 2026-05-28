import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuntosListComponent } from './app/pages/assuntos/assuntos-list/assuntos-list.component';
import { AssuntosFormComponent } from './app/pages/assuntos/assuntos-form/assuntos-form.component';

 const routes: Routes = [                                                                                                                                               
    { path: 'assuntos', component: AssuntosListComponent },                                                                                                              
    { path: 'assuntos/novo', component: AssuntosFormComponent },                                                                                                         
    { path: 'assuntos/:id/editar', component: AssuntosFormComponent }                                                                                                    
  ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
