import { Component, OnInit , ViewChild} from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../service/book.service';
import { Barrowedbook} from '../model/barrowedbook';
import { Observable , of } from "rxjs";
import { DatePipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material';
import {MatSort , MatPaginator} from '@angular/material';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Observable<Book[]>;
  barrowedbook: Barrowedbook;
  myDate = new Date();
  tempDate = new Date();


  constructor(private datePipe: DatePipe,
            private bookService: BookService) {
  }

  ngOnInit() {
   //sessionStorage.setItem('username', 'user');
    //sessionStorage.setItem('password', 'password');

    this.reloadData();

  }

  reloadData() {

    this.books = this.bookService.getAllBooks();


  }

  deleteOne(isbn: string) {
    this.bookService.deleteBook(isbn).subscribe(
         data => {
              this.reloadData()
         },error => {
             console.log('delete failed' + isbn)
             }
          );

  }

  isAdmin(){

    return sessionStorage.getItem('role') === 'ROLE_ADMIN';
  }

  isUser(){

      return sessionStorage.getItem('role') === 'ROLE_USER';
    }

   borrow(isbn,name){

          this.barrowedbook = new Barrowedbook(isbn,sessionStorage.getItem('username'),name,new Date());

          this.bookService.createBarrowedbook(this.barrowedbook).subscribe(
               data => {
                    this.reloadData()

               },error => {

                    console.log('borrowing failed')
                 }
           );

   }


}
