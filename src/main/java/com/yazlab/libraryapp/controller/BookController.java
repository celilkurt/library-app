package com.yazlab.libraryapp.controller;

import com.yazlab.libraryapp.dao.BarrowedBookRepository;
import com.yazlab.libraryapp.dao.BookRepository;
import com.yazlab.libraryapp.entity.BarrowedBook;
import com.yazlab.libraryapp.entity.Book;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path =  "/api")
public class BookController {

    private final BookRepository bookRepository;
    private final BarrowedBookRepository barrowedBookRepository;

    public BookController(BookRepository bookRepository, BarrowedBookRepository barrowedBookRepository){
        this.bookRepository = bookRepository;
        this.barrowedBookRepository = barrowedBookRepository;
    }

    //Delete a book
    @DeleteMapping(path =  "/books/{id}" )
    public Optional<Book> deleteBook(@PathVariable String id) {
        Optional<Book> book = bookRepository.findById(id);
        bookRepository.deleteById(id);

        return book;
    }

    @PostMapping(path="/books" ,produces = "application/json")
    public Optional<Book> createBook(@RequestBody Book book) {

        if(!barrowedBookRepository.existsById(book.getIsbn()))
            bookRepository.save(book);

            return bookRepository.findById(book.getIsbn());

    }




    //find isbn
    @PostMapping(path="/books/readphoto" )
    public String readPhoto(@RequestParam("imageFile") MultipartFile  multipartFile) {

        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("C:/Users/asus/Desktop/yazlab-prolab/library-app/tessdata");

        try {
            //System.out.println("Original Image Byte Size - " + multipartFile.getBytes().length);

            File file = convert(multipartFile);
            String str = tesseract.doOCR(file);
            String isbn = findISBN(str);
            //String isbn = findISBN(tesseract.doOCR(convert(multipartFile)));

            return isbn;

        } catch (TesseractException | IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    private static File convert(MultipartFile multipartFile) throws IOException {

        String str = multipartFile.getOriginalFilename();
        str = str.substring(str.indexOf('.')+1,str.length());
        File file = new File("temp." + str);
        file.createNewFile();
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(multipartFile.getBytes());
        fos.close();

        return file;
    }

    public static String findISBN(String str){

        String isbn = "";
        int count = 0;

        for(int i = 0; i < str.length();i++)
            if(count < 13 && Character.isDigit(str.charAt(i))){
                count++;
                isbn += str.charAt(i);
            }else if(count == 13)
                break;


        return isbn;
    }



    //Get all books
    @GetMapping(path="/books" )
    public List<Book> getBooks() {

        return (List<Book>) bookRepository.findAll();
    }



    @GetMapping(path="/books/createbooks" )
    public void createBooks(){

        bookRepository.save(new Book("Yer altından notlar","9786052169919"));
        bookRepository.save(new Book("Küçük prens","9786052169995"));
        bookRepository.save(new Book("Fizi 2","9786052164895"));
        bookRepository.save(new Book("Matematik 1","9786358169995"));
        bookRepository.save(new Book("Yerdeniz Büyücüsü","9789753428958"));
        bookRepository.save(new Book("Bülbülü Öldürmek","9786051736938"));
        bookRepository.save(new Book("Gülün Adı","9789750732737"));
        bookRepository.save(new Book("Görmek","9786052981320"));
        bookRepository.save(new Book("Yer altından notlar 2","9786052169918"));
        bookRepository.save(new Book("Küçük prens 2","9786052169994"));
        bookRepository.save(new Book("Fizi 3","9786052164894"));
        bookRepository.save(new Book("Matematik 2","9786358169994"));
        bookRepository.save(new Book("Yerdeniz Büyücüsü 2","9789753428957"));
        bookRepository.save(new Book("Bülbülü Öldürmek 4","9786051736937"));
        bookRepository.save(new Book("Gülün Adı 3","9789750732736"));
        bookRepository.save(new Book("Görmek 3","9786052981329"));

    }

    //Get a book
    @GetMapping(path = { "/books/{id}" })
    public Optional<Book> getBook(@PathVariable String id) {

        return bookRepository.findById(id);
    }



}
