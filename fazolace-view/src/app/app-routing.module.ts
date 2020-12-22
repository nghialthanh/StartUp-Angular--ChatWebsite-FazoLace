import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'

import {AuthGuard} from './guard/auth.guard'
import { AdminAuthGuard } from './guard/admin-auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AdminAuthGuard] },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'Dashboard', component:DashboardComponent, canActivate:[AuthGuard]}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
