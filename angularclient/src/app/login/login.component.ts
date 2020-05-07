import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username: string;
   password : string;
  errorMessage = 'Invalid Credentials';
    successMessage: string;
    invalidLogin = false;
    loginSuccess = false;

  constructor(private router: Router,
    private authService: AuthService,
    private bookService: BookService) { }

  ngOnInit() {


  }


      handleLogin() {
           this.authService.authenticate(this.username, this.password).subscribe(
                data => {

                  sessionStorage.setItem('username',this.username)
                  sessionStorage.setItem('password',this.password)
                  console.log('Login Successful. Welcome ' + this.username)
                  this.invalidLogin = false
                  this.loginSuccess = true
                  this.successMessage = 'Login Successful. Welcome ' + this.username
                  this.bookService.changeDate(0).subscribe(
                              data => {
                                  sessionStorage.setItem('date',data.date)

                                });
                },
                error => {
                  this.invalidLogin = true
                  console.log('Login failed' + error)
                }
              );

              }
        }

          /*if(this.authservice.authenticate(this.username, this.password)){


              sessionStorage.setItem('username',this.username);
              sessionStorage.setItem('password',this.password);
                  console.log('Login Successful. Welcome ' + this.username);
                  this.invalidLogin = false;
                  this.loginSuccess = true;
                  this.successMessage = 'Login Successful. Welcome ' + sessionStorage.getItem('username');
          }else{

          }
                  if(sessionStorage.getItem('username')==='admin'){
                            this.router.navigate(['admin']);
                  }*/




      /* (this.loginservice.authenticate(this.username, this.password).subscribe(
        data => {
        if(sessionStorage.getItem('username')==='admin'){
          this.router.navigate(['admin'])
        }
          this.invalidLogin = false
        },
        error => {
          this.invalidLogin = true
        }
      )
      );*/





