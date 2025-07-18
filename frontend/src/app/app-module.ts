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
    LoadPayments
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
    MatDivider
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
