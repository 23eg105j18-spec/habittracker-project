package com.example.demo.service;

import com.example.demo.model.Reminder;
import com.example.demo.repository.ReminderRepository;
import org.springframework.stereotype.Service;

@Service
public class ReminderService {

    private final ReminderRepository reminderRepository;

    public ReminderService(ReminderRepository reminderRepository) {
        this.reminderRepository = reminderRepository;
    }

    public Reminder saveReminder(Reminder reminder){
        return reminderRepository.save(reminder);
    }
}