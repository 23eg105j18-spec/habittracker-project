package com.example.demo.controller;

import com.example.demo.model.Reminder;
import com.example.demo.service.ReminderService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ReminderController {

    private final ReminderService reminderService;

    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;
    }

    @PostMapping("/reminder")
    public String addReminder(Reminder reminder){

        reminderService.saveReminder(reminder);

        return "redirect:/dashboard";
    }
}