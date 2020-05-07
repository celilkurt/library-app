import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent} from './login/login.component';
import { AppComponent } from './app.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { BookListComponent} from './book-list/book-list.component';
import { BarrowedListComponent} from './barrowed-list/barrowed-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { DatePipe } from '@angular/common';
import { ReturnBookComponent } from './return-book/return-book.component';
import { ChangeDateComponent } from './change-date/change-date.component';
import { RegistrationComponent } from './registration/registration.component';


import {
  MatCardModule,
      MatProgressSpinnerModule,
      MatMenuModule,
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatSortModule,
      MatTableModule
} from '@angular/material';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    LoginComponent,
    HeaderComponent,
    BookListComponent,
    BookFormComponent,
    BarrowedListComponent,
    ReturnBookComponent,
    ChangeDateComponent,
    RegistrationComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule
  ],
    providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
