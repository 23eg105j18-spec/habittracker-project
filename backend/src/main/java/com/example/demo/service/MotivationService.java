package com.example.demo.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class MotivationService {

    String[] quotes = {
            "Stay consistent, success will follow!",
            "Small habits create big results.",
            "Discipline beats motivation.",
            "Every day is a chance to improve.",
            "Consistency is the key to mastery."
    };

    Random random = new Random();

    public String getRandomQuote() {
        int index = random.nextInt(quotes.length);
        return quotes[index];
    }

    @Scheduled(fixedRate = 7200000)
    public void sendMotivation() {
        System.out.println("Motivation: " + getRandomQuote());
    }
}