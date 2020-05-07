import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[];
  constructor( private authService: AuthService) { }


  ngOnInit(): void {
      this.reloadData();
  }


  reloadData(){

    this.authService.getUsers().subscribe(
        data => {
               this.users = data;
        },error => {
        }
    );


  }
}
