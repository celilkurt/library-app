import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent implements OnInit {

  user: User = new User("","","");
  errorMessage = "Kayıt başarısız!";
  successMessage = "Kayıt Başarılı";
  invalidLogin = false;
  loginSuccess = false;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {

  }

  handleLogin(){

      this.authService.register(this.user).subscribe(
          data => {
               this.loginSuccess = true;
               this.invalidLogin = false;
          },error => {
                  this.loginSuccess = false;
                  this.invalidLogin = true;
           }
           );
  }

}
