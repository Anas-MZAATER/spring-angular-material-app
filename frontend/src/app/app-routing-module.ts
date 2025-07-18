import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Home} from './home/home';
import { Profile } from './profile/profile';
import {Dashboard} from './dashboard/dashboard';
import {Students} from './students/students';
import {Payments} from './payments/payments';
import {Login} from './login/login';

const routes: Routes = [
  {path : "home" , component : Home },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: Profile },
  {path:'dashboard',component:Dashboard},
  {path:'students',component:Students},
  {path:'payments',component:Payments},
  {path:'login',component:Login}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
