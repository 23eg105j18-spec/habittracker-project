package com.example.demo.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.DashboardDTO;
import com.example.demo.repository.HabitLogRepository;
import com.example.demo.repository.HabitRepository;

@Service
public class DashboardService {

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private HabitLogRepository habitLogRepository;

    public DashboardDTO getDashboardData() {
        long totalHabits = habitRepository.count();

        int completedToday = habitLogRepository
                .findByDateAndCompleted(LocalDate.now(), true)
                .size();

        int streak = completedToday > 0 ? 1 : 0;

        double successRate = totalHabits == 0 ? 0
                : ((double) completedToday / totalHabits) * 100;

        DashboardDTO dashboard = new DashboardDTO();
        dashboard.setMessage("Welcome to Habit Tracker Dashboard");
        dashboard.setTotalHabits((int) totalHabits);
        dashboard.setCompletedToday(completedToday);
        dashboard.setCurrentStreak(streak);
        dashboard.setSuccessRate(successRate);

        return dashboard;
    }
}