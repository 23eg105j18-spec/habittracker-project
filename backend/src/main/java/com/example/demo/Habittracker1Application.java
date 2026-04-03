package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Habittracker1Application {

    public static void main(String[] args) {
        SpringApplication.run(Habittracker1Application.class, args);
    }
}