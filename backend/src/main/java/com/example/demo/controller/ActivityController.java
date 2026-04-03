package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Habit;
import com.example.demo.service.HabitService;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    @Autowired
    private HabitService habitService;

    @GetMapping("/today/{userId}")
    public List<Habit> getTodayActivities(@PathVariable Long userId) {
        return habitService.getTodayHabits(userId);
    }
}