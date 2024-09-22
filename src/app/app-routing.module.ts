import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './component/add-user/add-user.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UpdateUserComponent } from './component/update-client/update-client.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './component/login/login.component';
import { AddClientComponent } from './component/add-client/add-client.component';
import { ClientListComponent } from './component/client-list/client-list.component';
import { ClientProbableListComponent } from './component/client-probable-list/client-probable-list.component';
import { EtatDeCaisseListComponent } from './etat-de-caisse-list/etat-de-caisse-list.component';
import { EtatFinanciereComponent } from './component/etat-financiere/etat-financiere.component';
import { ClientProbableFormComponent } from './component/client-probable-form/client-probable-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sidenav', component: SidenavComponent }, 
  {
    path: '',
    
    component: SidenavComponent,
    
    children: [
      
      { path: 'users', component: UserListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'add-client', component: AddClientComponent },
      { path: 'clients', component: ClientListComponent },
      { path: 'clients/update/:id', component: UpdateUserComponent },
      { path: 'clients/add', component: AddClientComponent },
      {path:'clientProbable/list',component:ClientProbableListComponent},
      {path: 'etatDeCaisse', component:EtatDeCaisseListComponent},
      {path:'etatfinancier',component:EtatFinanciereComponent},
      { path: 'client-probable-form', component: ClientProbableFormComponent }, // Add new client
      { path: 'client-probable-form/:id', component: ClientProbableFormComponent } // Update client
      
    ]
  }
];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }