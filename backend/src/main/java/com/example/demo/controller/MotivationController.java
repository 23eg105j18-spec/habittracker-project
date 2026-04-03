package com.example.demo.controller;

import com.example.demo.service.MotivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/motivation")
public class MotivationController {

    @Autowired
    private MotivationService motivationService;

    @GetMapping
    public String getQuote(){
        return motivationService.getRandomQuote();
    }
}