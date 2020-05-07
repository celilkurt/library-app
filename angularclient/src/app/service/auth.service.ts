import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:HttpClient
             ) { }

   register(user){
        return this.httpClient.post<string>('http://localhost:8080/register',user);

   }

   getUsers(){

      let username = sessionStorage.getItem('username');
       let password = sessionStorage.getItem('password');

      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.httpClient.get<User[]>("http://localhost:4200/api/users" ,{headers}).pipe(
             map(
                 data => {
                        console.log("get users: " + data);
                        return data;
                 }
             )
      );

   }

  authenticate(username, password) {

      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
          return this.httpClient.get<User>('http://localhost:4200/api/login/'+ username,{headers}).pipe(
           map(
             data => {
              sessionStorage.setItem('username',username);
              sessionStorage.setItem('role',data.role);
              return data;
             }
           )
          );
      }


    /*if(username === "admin" && password === "password" ) {
      sessionStorage.setItem('username',username)
      sessionStorage.setItem('password',password)
          return true;
     }else{
        return false;
     }*/


  isUserLogged(){

    console.log(!(sessionStorage.getItem('username') === null))
    return !(sessionStorage.getItem('username') === null)
  }

  logOut(){
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('password');
      sessionStorage.removeItem('username');
  }

}
