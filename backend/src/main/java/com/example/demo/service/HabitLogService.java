package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.HabitLog;
import com.example.demo.repository.HabitLogRepository;

@Service
public class HabitLogService {

    @Autowired
    private HabitLogRepository habitLogRepository;

    public HabitLog markHabitComplete(HabitLog habitLog) {
        return habitLogRepository.save(habitLog);
    }

    public List<HabitLog> getLogs() {
        return habitLogRepository.findAll();
    }

    public List<HabitLog> getLogsByDate(LocalDate date) {
        return habitLogRepository.findByDate(date);
    }
}