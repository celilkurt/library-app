package com.yazlab.libraryapp.controller;


import com.yazlab.libraryapp.dao.BarrowedBookRepository;
import com.yazlab.libraryapp.dao.BookRepository;
import com.yazlab.libraryapp.entity.BarrowedBook;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.temporal.ChronoUnit.DAYS;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path =  "/api")
public class BarrowedBookController {

    private final BarrowedBookRepository barrowedBookRepository;
    private final BookRepository bookRepository;


    public BarrowedBookController(BarrowedBookRepository barrowedBookRepository,BookRepository bookRepository){
        this.barrowedBookRepository = barrowedBookRepository;
        this.bookRepository = bookRepository;
    }

    //get all barrowed books
    @GetMapping(path="/barrowedbooks" ,produces = "application/json")
    public List<BarrowedBook> getBooks() {

        return findAllBarrowedBooks();
    }

    //get all barrowed books
    @GetMapping(path="/barrowedbooks/{name}" ,produces = "application/json")
    public List<BarrowedBook> getBarrowedBooksByName(@PathVariable String name) {

        List<BarrowedBook> list = findAllBarrowedBooks();
        List<BarrowedBook> newList = new ArrayList<>();

        for(BarrowedBook book: list)
            if(book.getUserName().equals(name)){
                book.updateRemainingDays();
                newList.add(book);
            }


        return newList;
    }

    //get a barrowed books
    @GetMapping(path = { "/barrowedbooks/{id}" })
    public Optional<BarrowedBook> getBArrowedBook(@PathVariable String id) {

        return barrowedBookRepository.findById(id);
    }


    //delete a barrowed book
    @DeleteMapping(path = { "/barrowedbooks/{id}" })
    public boolean deleteBarrowedBook(@PathVariable String id) {

        if( barrowedBookRepository.existsById(id)){
            barrowedBookRepository.deleteById(id);
            return true;
        }
         return false;
    }
    //create a barrowed book
    @PostMapping(path="/barrowedbooks" )
    public Optional<BarrowedBook> createBarrowedBook(@RequestBody BarrowedBook book) {

        if(borrowCheck(book.getUserName())){

            List<BarrowedBook> tempList = findAllBarrowedBooks();
            for(BarrowedBook tempBook: tempList)
                tempBook.setBarrowingDate(tempBook.getBarrowingDate().plusDays(1));
            barrowedBookRepository.saveAll(tempList);

            BarrowedBook newBook = new BarrowedBook(book.getBookName(),book.getUserName(),book.getIsbn(),getCurDate().plusDays(1),7);
            barrowedBookRepository.save(newBook);

            //Burdan sonra varolan kayıtların barrowing date'ını değiştiriyor.
            //Role'u bir objenin içinde göndermek gerek.



            bookRepository.deleteById(book.getIsbn());
        }
        return barrowedBookRepository.findById(book.getIsbn());
    }

    public List<BarrowedBook> findAllBarrowedBooks(){

        List<BarrowedBook> tempList = (List<BarrowedBook>) barrowedBookRepository.findAll();

        for(BarrowedBook book: tempList){
            //System.out.println(book.getBookName() + "    " + book.getBarrowingDate().toString());
            book.updateRemainingDays();
        }
        return  tempList;
    }

    public boolean borrowCheck(String username){


        List<BarrowedBook> books = findAllBarrowedBooks();
        List<BarrowedBook> newList = new ArrayList<>();

        for(BarrowedBook book: books)
            if(book.getUserName().equals(username))
                newList.add(book);


        if(newList.size() == 3)
            return false;

        for(int i = 0; i < newList.size(); i++)
            if(newList.get(i).getRemainingDays() < 0)
                return false;


        return true;
    }

    public  LocalDate getCurDate(){

        if(DateController.getOffset() != 0)
            return LocalDate.now().plusDays(DateController.getOffset());

        return LocalDate.now();
    }

}
