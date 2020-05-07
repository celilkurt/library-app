package com.yazlab.libraryapp.controller;

import com.yazlab.libraryapp.entity.MyUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

    @Autowired
    private JdbcUserDetailsManager jdbcUserDetailsManager;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private DataSource dataSource;

    @PostMapping(value = "/register")
    public String regiter(@RequestBody MyUser user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        String encodededPassword = passwordEncoder.encode(user.getPassword());
        User newUser = new User(user.getUsername(), encodededPassword, authorities);
        jdbcUserDetailsManager.createUser(newUser);

        return "User created :)";
    }

    @GetMapping(value = "/api/login/{username}")
    public MyUser login(@PathVariable String username) {

        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            con = dataSource.getConnection();
            stmt = con.createStatement();
            rs = stmt.executeQuery("select authority from authorities where username = '" + username + "'");
            rs.next();

            String authority = rs.getString("authority");
            return new MyUser("","",authority);


        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (con != null) con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    @GetMapping(value = "/api/users")
    public List<MyUser> getUsers(){

        List<MyUser> userList = new ArrayList<>();

        Connection con = null;
        Statement stmt = null;
        Statement stmt2 = null;
        ResultSet rs = null;
        ResultSet rs2 = null;
        try {
            con = dataSource.getConnection();
            stmt = con.createStatement();
            stmt2 = con.createStatement();
            rs = stmt.executeQuery("select username from users");

            while(rs.next()){
                String username = rs.getString("username");
                rs2 = stmt2.executeQuery("select authority from authorities where username = '" + username + "'");
                if(rs2.next())
                    userList.add(new MyUser(username,"",rs2.getString("authority")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally{
            try {
                if(rs != null) rs.close();
                if(stmt != null) stmt.close();
                if(rs2 != null) rs2.close();
                if(stmt2 != null) stmt2.close();
                if(con != null) con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return userList;

    }




}
