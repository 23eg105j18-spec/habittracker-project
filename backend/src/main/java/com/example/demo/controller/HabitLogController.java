package com.example.demo.controller;

import com.example.demo.model.HabitLog;
import com.example.demo.service.HabitLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/habit-log")
public class HabitLogController {

    @Autowired
    private HabitLogService habitLogService;

    @PostMapping("/complete")
    public HabitLog completeHabit(@RequestBody HabitLog habitLog) {
        return habitLogService.markHabitComplete(habitLog);
    }

    @GetMapping
    public List<HabitLog> getLogs() {
        return habitLogService.getLogs();
    }

    @GetMapping("/date/{date}")
    public List<HabitLog> getLogsByDate(@PathVariable String date) {
        return habitLogService.getLogsByDate(LocalDate.parse(date));
    }
}