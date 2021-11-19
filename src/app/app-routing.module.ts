import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent } from 'src/app/components/login/login.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';
import { ItemComponent } from 'src/app/components/item/item.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //Path es lo que se muestra en la URL  
  { path: 'folders', component: FolderComponent }, 
  { path: 'login', component: LoginComponent },   
  { path: 'items', component: ItemComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' } //Siempre al ultimo (Error 404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
