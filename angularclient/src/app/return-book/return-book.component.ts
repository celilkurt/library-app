import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';
import { Barrowedbook } from '../model/barrowedbook';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {

  fileData: File = null;
    fileAdress: string = "";
    previewUrl:any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    isbn: string = "";
    book: Book;
    isFailed: boolean = false;


  constructor(private route: ActivatedRoute,
                            private router: Router,
                            private bookService: BookService) {

                             this.book = new Book("","");

    }



  ngOnInit(): void {
  }

  onSubmit() {

            this.book = new Book(this.isbn,sessionStorage.getItem('bookname'));

             this.bookService.deleteBarrowedbook(this.book.isbn).subscribe(
                       data => {

                            if(data){
                                this.bookService.createBook(this.book).subscribe(
                                                data => {
                                                       console.log('data: ' + data)
                                                },error => {
                                                       console.log('submit failed')
                                                 }
                                             )
                                this.router.navigate(['barrowedbooks'])
                            }
                            this.isFailed = true;

                        },
                         error => {
                         console.log('submit failed')
                          }
                       );



    }

    fileProgress(fileInput: any) {
          this.fileData = <File>fileInput.target.files[0];
          this.fileAdress = fileInput.target;
          this.preview();
    }

    preview() {
        // Show preview
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
          this.previewUrl = reader.result;
        }
    }

    scan() {

       console.log(this.fileData);

             const formData = new FormData();
             formData.append('imageFile', this.fileData, this.fileData.name);

                this.bookService.uploadImage(formData).subscribe(
                   (response) => {

                      this.book.isbn = response;
                      this.isbn = this.book.isbn;

                   }, (data) => {

                   }
                );
    }

  isSelected(){

      return this.fileData != null;
    }


}
