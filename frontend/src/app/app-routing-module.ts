import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Home} from './home/home';
import { Profile } from './profile/profile';
import {Dashboard} from './dashboard/dashboard';
import {Students} from './students/students';
import {Payments} from './payments/payments';
import {Login} from './login/login';
import {LoadStudents} from './load-students/load-students';
import {LoadPayments} from './load-payments/load-payments';
import {AdminTemplate} from "./admin-template/admin-template";
import {Template} from "./template/template";

const routes: Routes = [
  {path:'login',component:Login},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  // {path : 'admin' , component : AdminTemplate,
  //           children : [
  //             {path : 'home' , component : Home },
  //             {path: 'profile', component: Profile },
  //             {path:'dashboard',component:Dashboard},
  //             {path:'students',component:Students},
  //             {path:'payments',component:Payments},
  //             {path:'loadStudents',component:LoadStudents},
  //             {path:'loadPayments',component:LoadPayments}
  //           ]},
  {path : 'template' , component : Template,
    children : [
      {path : 'home' , component : Home },
      {path: 'profile', component: Profile },
      {path:'dashboard',component:Dashboard},
      {path:'students',component:Students},
      {path:'payments',component:Payments},
      {path:'loadStudents',component:LoadStudents},
      {path:'loadPayments',component:LoadPayments}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
