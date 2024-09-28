import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AddUserComponent } from './component/add-user/add-user.component';
import {EtatFinanciereComponent} from './component/etat-financiere/etat-financiere.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserListComponent } from './component/user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './component/layout/layout.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { AddClientComponent } from './component/add-client/add-client.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ClientListComponent } from './component/client-list/client-list.component';
import { UpdateUserComponent } from './component/update-client/update-client.component';
import { ClientProbableListComponent } from './component/client-probable-list/client-probable-list.component';
import { ClientSearchbarComponent } from './component/client-searchbar/client-searchbar.component';
import { ClientDetailsDialogComponent } from './component/client-details-dialog/client-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EtatDeCaisseListComponent } from './etat-de-caisse-list/etat-de-caisse-list.component';
import { PaymentDialogComponent } from './component/payment-dialog/payment-dialog.component';
import { DatePipe } from '@angular/common';



import { ClientProbableFormComponent } from './component/client-probable-form/client-probable-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    SidenavComponent,
    AddUserComponent,
    UserListComponent,
    LayoutComponent,
    MainPageComponent,
    AddClientComponent,
    ClientListComponent,
    UpdateUserComponent,
    ClientProbableListComponent,
    ClientSearchbarComponent,
    ClientDetailsDialogComponent,
    EtatDeCaisseListComponent,
    PaymentDialogComponent,
    EtatFinanciereComponent,
    ClientProbableFormComponent,
    ConfirmDialogComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatStepperModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
