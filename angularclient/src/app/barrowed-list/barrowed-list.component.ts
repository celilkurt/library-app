import { Component, OnInit } from '@angular/core';
import { Barrowedbook } from '../model/barrowedbook';
import { Book } from '../model/book';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';
//import { AuthService } from '../service/auth.service';





@Component({
  selector: 'app-barrowed-list',
  templateUrl: './barrowed-list.component.html',
  styleUrls: ['./barrowed-list.component.css']
})


export class BarrowedListComponent implements OnInit {

    books: Barrowedbook[];
    newBook: Book;

  constructor(private bookService: BookService,
              private router: Router) { }

  ngOnInit() {
      this.reloadData();
  }

  reloadData(){
      let username = sessionStorage.getItem('username');
      if(this.isUser()){
          this.bookService.getBarrowedbooksByName(username).subscribe(data => {
                          this.books = data;

                        });
      }else{
          this.bookService.getAllBarrowedbooks().subscribe(data => {
                          this.books = data;

                        });
      }

  }



  returnBook(isbn,name){

    sessionStorage.setItem('bookname',name);
    sessionStorage.setItem('isbn',isbn);

    this.router.navigate(['returnbook']);
    /*this.newBook = new Book(isbn,name);

    this.bookService.createBook(this.newBook).subscribe(data => {
            });

    this.bookService.deleteBarrowedbook(isbn).subscribe(data => {
            this.reloadData()
           });*/

  }

  isUser(){
      return sessionStorage.getItem('role') === 'ROLE_USER';
  }
}
