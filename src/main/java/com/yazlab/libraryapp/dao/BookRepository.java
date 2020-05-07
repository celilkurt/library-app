package com.yazlab.libraryapp.dao;

import com.yazlab.libraryapp.entity.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository//("CrudRepository")
public interface BookRepository extends CrudRepository<Book,String> {
}
