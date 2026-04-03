package com.example.demo.service;

import com.example.demo.model.Habit;
import com.example.demo.repository.HabitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HabitService {

    private final HabitRepository habitRepository;

    public HabitService(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }

    public List<Habit> getTodayHabits(Long userId) {
        return habitRepository.findByUserId(userId);
    }

    public Habit updateHabitStatus(Long id, boolean completedToday) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found"));

        habit.setCompletedToday(completedToday);

        if (completedToday) {
            habit.setCurrentStreak(habit.getCurrentStreak() + 1);

            if (habit.getCurrentStreak() > habit.getLongestStreak()) {
                habit.setLongestStreak(habit.getCurrentStreak());
            }
        } else {
            habit.setCurrentStreak(Math.max(habit.getCurrentStreak() - 1, 0));
        }

        return habitRepository.save(habit);
    }

    public void deleteHabit(Long id) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found"));

        habitRepository.delete(habit);
    }
}