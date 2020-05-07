import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
//import { AppComponent } from './app.component';
import { AuthGuardService } from './service/auth-guard.service';
import { BookListComponent} from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BarrowedListComponent} from './barrowed-list/barrowed-list.component';
import { ReturnBookComponent} from './return-book/return-book.component';
import { ChangeDateComponent} from './change-date/change-date.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserListComponent} from './user-list/user-list.component';


const routes: Routes = [
  //{ path: '', component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGuardService]},
  { path: 'books', component: BookListComponent,canActivate:[AuthGuardService]},
  { path: 'addbook', component: BookFormComponent,canActivate:[AuthGuardService]},
  { path: 'barrowedbooks', component: BarrowedListComponent,canActivate:[AuthGuardService]},
  { path: 'returnbook', component: ReturnBookComponent,canActivate:[AuthGuardService]},
  { path: 'changedate', component: ChangeDateComponent,canActivate:[AuthGuardService]},
  { path: 'register', component: RegistrationComponent},
  { path: 'users', component: UserListComponent,canActivate:[AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
