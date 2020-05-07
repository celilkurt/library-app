package com.yazlab.libraryapp.controller;


import com.yazlab.libraryapp.entity.Book;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path =  "/api")
public class DateController {

    private static int offset = 0;

    @GetMapping(path =  "/changedate/{count}" )
    public MyDate changeDate(@PathVariable int count) {

        offset += count;
        return new MyDate("Date: " + LocalDate.now().plusDays(offset));
    }

    public static int getOffset(){ return offset;

    }

    public class MyDate{
        private String date;

        public MyDate(String date){ this.date = date;}

        public String getDate(){return this.date;}

        public void setDate(String date){
            this.date = date;
        }

    }
}
