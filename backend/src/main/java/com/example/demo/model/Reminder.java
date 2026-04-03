package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private LocalTime reminderTime;

    @ManyToOne
    private User user;

}