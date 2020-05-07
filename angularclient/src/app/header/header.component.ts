import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
   public loginService: AuthService) { }

  ngOnInit() {

  }

  isAdmin() {
    return sessionStorage.getItem('role')==='ROLE_ADMIN';
  }

  isUser(){
      return sessionStorage.getItem('role')==='ROLE_USER';
  }

  getCurrentDate(){

    return sessionStorage.getItem('date');
  }
}
