import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';
import { FormBuilder } from "@angular/forms";




@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {

  fileData: File = null;
  fileAdress: string = "";
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  message: string;


  book: Book;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) {

                      this.book = new Book("","");
                       }


  onSubmit() {
    console.log('Submit works!!');

    this.bookService.createBook(this.book).subscribe(
         data => {
              console.log('data: ' + data)
              this.router.navigate(['books'])
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

  onSubmit2() {

      console.log(this.fileData);

      const formData = new FormData();
      formData.append('imageFile', this.fileData, this.fileData.name);

         this.bookService.uploadImage(formData).subscribe(
            (response) => {

               this.book.isbn = response;
               this.message = this.book.isbn;

            }, (data) => {

            }
         );
  }

  createBooks(){

      this.bookService.createBooks().subscribe(
           (response) => {
              this.router.navigate(['books'])
          }
      );
  }

  isSelected(){

    return this.fileData != null;
  }

}
