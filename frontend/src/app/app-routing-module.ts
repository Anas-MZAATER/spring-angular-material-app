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
import {Template} from "./template/template";
import {authGuards} from "./guards/auth-guard";
import {authorizationGuards} from "./guards/authorization-guard";
import {StudentDetails} from "./student-details/student-details";
import {NewPayment} from "./new-payment/new-payment";
import {PaymentDetails} from "./payment-details/payment-details";

const routes: Routes = [
  // {path : 'admin' , component : AdminTemplate,
  //           children : [
  //             {path : 'home' , component : Home },
  //             {path: 'profile', component: Profile },
  //             {path:'dashboard',component:Dashboard},
  //             {path:'students',component:StudentsService},
  //             {path:'payments',component:Payments},
  //             {path:'loadStudents',component:LoadStudents},
  //             {path:'loadPayments',component:LoadPayments}
  //           ]},
  {path:'login',component:Login},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path : 'template' , component : Template,canActivate:[authGuards],
    children : [
      {path : 'home' , component : Home },
      {path: 'profile', component: Profile },
      {path:'dashboard',component:Dashboard},
      {path:'students',component:Students},
      {path:'payments',component:Payments},
      {path:'studentDetails/:code',component:StudentDetails},
      {path:'newPayment/:code',component:NewPayment},//suivre studentCode
      {path:'paymentDetails/:paymentId',component:PaymentDetails},
      {
        path:'loadStudents',component:LoadStudents,
        canActivate:[authorizationGuards],
        data:{roles:['ADMIN']}
      },

      {
        path:'loadPayments',component:LoadPayments,
        canActivate:[authorizationGuards],
        data:{roles:['ADMIN']}
      }
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
