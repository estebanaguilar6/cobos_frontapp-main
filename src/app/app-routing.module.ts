import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ConocenosComponent } from './components/pages/conocenos/conocenos.component';
import { ServiciosComponent } from './components/pages/servicios/servicios.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path:'',
    component:IndexComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'servicios',
    component: ServiciosComponent
  },
  {
    path:'conocenos',
    component: ConocenosComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent, canActivate:[AuthGuard]
  },
  {
    path:'users',
    component: UsersComponent, canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
