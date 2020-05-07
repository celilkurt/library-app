import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import {  Router } from '@angular/router';
import { Date } from '../model/mydate';


@Component({
  selector: 'app-change-date',
  templateUrl: './change-date.component.html',
  styleUrls: ['./change-date.component.css']
})
export class ChangeDateComponent implements OnInit {

  count: Number;

  constructor(private bookService: BookService,
              private router: Router) { }

  ngOnInit(): void {
      if(sessionStorage.getItem('role') !== 'ROLE_ADMIN')
           this.router.navigate(['login']);
  }

  handleChange(){

      this.bookService.changeDate(this.count).subscribe(
            data => {
                sessionStorage.setItem('date',data.date)
                //var obj = JSON.parse(data.replace(/ 0+(?![\. }])/g, ' '));
                 //sessionStorage.setItem('date',obj);

              });


      this.router.navigate(['barrowedbooks']);

  }

}
