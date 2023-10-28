import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSortable } from '@angular/material/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentEditorComponent } from './components/student-editor/student-editor.component';
import { DialogEditWrapperComponent } from './components/student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { DialogEditInfoComponent } from './components/student-editor/dialog-edit-info/dialog-edit-info.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { BaseServiceService } from './service/base-service.service';
import { SessionStorageService } from 'angular-web-storage';
import { LoginComponent } from './components/home/login/login.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { HomeComponent } from './components/home/home/home.component';
import { StudentComponent } from './components/home/student/student.component';
import { CookieService } from 'ngx-cookie-service';
import { CustomPaginatorIntl } from './customPaginatorIntl';



@NgModule({
  declarations: [
    AppComponent,
    StudentEditorComponent,
    DialogEditWrapperComponent,
    DialogEditInfoComponent,
    MaterialTableComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule
  ],
  providers: [BaseServiceService,SessionStorageService,CookieService,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  bootstrap: [AppComponent]
})
export class AppModule { }
