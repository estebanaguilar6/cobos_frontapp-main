import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//To work with reactive forms
import { ReactiveFormsModule } from '@angular/forms';

//To work with http requests
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { PanelComponent } from './components/panel/panel.component';
import { UsersComponent } from './components/users/users.component';
import { ServiciosComponent } from './components/pages/servicios/servicios.component';
import { ConocenosComponent } from './components/pages/conocenos/conocenos.component';

//To work with @material table
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

//To work with form controls
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//To work with alerts
import { MatSnackBarModule} from '@angular/material/snack-bar';

//To work with icons
import {MatIconModule} from '@angular/material/icon';

//To work with modals
import {MatDialogModule} from '@angular/material/dialog';

//To work with Grids
import { MatGridListModule } from '@angular/material/grid-list';

import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { DialogRndComponent } from './components/dialog-rnd/dialog-rnd.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    DashboardComponent,
    SideNavComponent,
    PanelComponent,
    UsersComponent,
    ServiciosComponent,
    ConocenosComponent,
    DialogUserComponent,
    DialogRndComponent
  ],
  imports: [
    MatSliderModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
