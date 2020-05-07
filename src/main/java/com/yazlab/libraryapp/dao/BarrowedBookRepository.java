package com.yazlab.libraryapp.dao;

import com.yazlab.libraryapp.entity.BarrowedBook;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarrowedBookRepository extends CrudRepository<BarrowedBook,String> {

}
