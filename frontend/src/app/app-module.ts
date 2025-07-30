import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Template } from './template/template';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatDivider, MatListItem, MatNavList} from '@angular/material/list';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Dashboard } from './dashboard/dashboard';
import { Students } from './students/students';
import { Payments } from './payments/payments';
import { Login } from './login/login';
import {MatTabLink, MatTabNav} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { LoadStudents } from './load-students/load-students';
import { LoadPayments } from './load-payments/load-payments';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {authGuards} from "./guards/auth-guard";
import {authorizationGuards} from "./guards/authorization-guard";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { StudentDetails } from './student-details/student-details';
import {MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import { NewPayment } from './new-payment/new-payment';
import {MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { PaymentDetails } from './payment-details/payment-details';

@NgModule({
  declarations: [
    App,
    Template,
    Home,
    Profile,
    Dashboard,
    Students,
    Payments,
    Login,
    LoadStudents,
    LoadPayments,
    StudentDetails,
    NewPayment,
    PaymentDetails,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    MatTabNav,
    MatTabLink,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginator,
    MatSortHeader,
    MatSort,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    PdfViewerModule, MatProgressSpinnerModule
  ],
  providers: [
    authGuards,
    authorizationGuards
  ],
  bootstrap: [App]
})
export class AppModule { }
