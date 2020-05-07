package com.yazlab.libraryapp.entity;

import com.yazlab.libraryapp.controller.DateController;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

import static java.time.temporal.ChronoUnit.DAYS;

@Entity
@Table(name = "barrowed_book")
public class BarrowedBook {

    private String userName;
    private String bookName;
    @Id
    private String isbn;
    private LocalDate barrowingDate;
    private long remainingDays;

    public BarrowedBook() {
    }

    public BarrowedBook(String isbn) {
        this.isbn = isbn;
    }

    public BarrowedBook(String bookName,String userName, String isbn, LocalDate barrowingDate,int remainingDays) {

        this.bookName = bookName;
        this.userName = userName;
        this.isbn = isbn;
        this.barrowingDate = barrowingDate;
        this.remainingDays = remainingDays;
    }

    public void setBarrowingDate(LocalDate barrowingDate) {
        this.barrowingDate = barrowingDate;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public LocalDate getBarrowingDate() {
        return barrowingDate;
    }


    public long getRemainingDays() {
        return this.remainingDays;
    }

    public void updateRemainingDays(){
        this.remainingDays = DAYS.between(getCurDate(),barrowingDate.plusDays(7));
    }

    public void setRemainingDays(long remainingDays) {
        this.remainingDays = remainingDays;
    }

    public  LocalDate getCurDate(){

        if(DateController.getOffset() != 0)
            return LocalDate.now().plusDays(DateController.getOffset());

        return LocalDate.now();
    }
}
