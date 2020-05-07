package com.yazlab.libraryapp.entity;

import javax.persistence.*;

@Entity
@Table(name = "book")
public class Book {


    /*@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;*/
    @Column(name = "name")
    private String name;
    @Id
    @Column(name = "isbn")
    private String isbn;

    public Book(){}

    public Book(String name,String isbn){
        this.name = name;
        this.isbn = isbn;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){ return name;}

    public void setIsbn(String isbn){
        this.isbn = isbn;
    }

    public String getIsbn(){ return isbn; }

   /* public long getId(){ return id;}*/

}
