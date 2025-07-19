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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    // MatToolbar,
    MatButtonModule,
    MatIconModule,
    // MatIcon,
    MatMenuModule,
    // MatMenuTrigger,
    // MatMenuItem,
    MatSidenavModule,
    // MatDrawerContainer,
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
    // MatColumnDef,
    // MatHeaderCell,
    // MatCell,
    // MatHeaderRow,
    // MatRow,
    // MatHeaderCellDef,
    // MatCellDef,
    // MatHeaderRowDef,
    // MatRowDef
    ReactiveFormsModule
  ],
  providers: [
    authGuards,
    authorizationGuards
  ],
  bootstrap: [App]
})
export class AppModule { }
