import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Book } from '../model/book';
import { Barrowedbook } from '../model/barrowedbook';
import { Date } from '../model/mydate';


@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(
      private httpClient:HttpClient
      ) { }

  getAllBooks(){
      let username = sessionStorage.getItem('username');
      let password = sessionStorage.getItem('password');

      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.httpClient.get<Book[]>('http://localhost:4200/api/books',{headers});
  }

  getBook(isbn){
      let username = sessionStorage.getItem('username');
      let password = sessionStorage.getItem('password');

      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.httpClient.get<Book>("http://localhost:4200/api/books" + "/"+isbn,{headers});

  }

  createBook(book){

      let username = sessionStorage.getItem('username');
      let password = sessionStorage.getItem('password');

      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.httpClient.post<Book>("http://localhost:4200/api/books",book,{headers});
  }

  deleteBook(isbn){

      let username = sessionStorage.getItem('username');
      let password = sessionStorage.getItem('password');

      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.httpClient.delete<Book>("http://localhost:4200/api/books" + "/"+isbn,{headers});

  }

  getBarrowedbook(isbn){

        let username = sessionStorage.getItem('username');
        let password = sessionStorage.getItem('password');

        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.delete<Barrowedbook>("http://localhost:4200/api/barrowedbooks" + "/"+isbn,{headers});

    }

  getAllBarrowedbooks(){
        let username = sessionStorage.getItem('username');
        let password = sessionStorage.getItem('password');

        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<Barrowedbook[]>('http://localhost:4200/api/barrowedbooks',{headers});
    }

    getBarrowedbooksByName(name){
          let username = sessionStorage.getItem('username');
          let password = sessionStorage.getItem('password');

          const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
          return this.httpClient.get<Barrowedbook[]>("http://localhost:4200/api/barrowedbooks" + "/"+name,{headers});

    }

    createBarrowedbook(barrowedbook){

        let username = sessionStorage.getItem('username');
        let password = sessionStorage.getItem('password');

        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.post<Barrowedbook>("http://localhost:4200/api/barrowedbooks",barrowedbook,{headers});
    }

    deleteBarrowedbook(isbn){
        let username = sessionStorage.getItem('username');
        let password = sessionStorage.getItem('password');

        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.delete<boolean>("http://localhost:4200/api/barrowedbooks" + "/"+isbn,{headers});
    }

    public uploadImage(target) {
        let username = sessionStorage.getItem('username');
        let password = sessionStorage.getItem('password');

        //const formData = new FormData();
        //formData.append('image', image);

        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.post<string>("http://localhost:4200/api/books/readphoto" , target,{headers});
      }

      public createBooks() {
              let username = sessionStorage.getItem('username');
              let password = sessionStorage.getItem('password');

              const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
              return this.httpClient.get<void>("http://localhost:4200/api/books/createbooks" ,{headers});
            }

      changeDate(count){
              let username = sessionStorage.getItem('username');
              let password = sessionStorage.getItem('password');

              const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
              return this.httpClient.get<Date>("http://localhost:4200/api/changedate/"+count,{headers});
          }



}
