import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './component/add-user/add-user.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UpdateUserComponent } from './component/update-user/update-user.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './component/login/login.component';

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
      { path: 'update-user/:id', component: UpdateUserComponent },
    ]
  }
];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }