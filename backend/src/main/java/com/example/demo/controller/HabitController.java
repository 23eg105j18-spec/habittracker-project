package com.example.demo.controller;

import com.example.demo.model.Habit;
import com.example.demo.repository.HabitRepository;
import com.example.demo.service.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/habits")
@CrossOrigin(origins = "http://localhost:3000")
public class HabitController {

    private final HabitRepository habitRepository;
    private final HabitService habitService;

    public HabitController(HabitRepository habitRepository, HabitService habitService) {
        this.habitRepository = habitRepository;
        this.habitService = habitService;
    }

    @PostMapping
    public Habit addHabit(@RequestBody Habit habit) {
        return habitRepository.save(habit);
    }

    @GetMapping("/user/{userId}")
    public List<Habit> getHabitsByUser(@PathVariable Long userId) {
        return habitRepository.findByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Habit> getHabitById(@PathVariable Long id) {
        Optional<Habit> habit = habitRepository.findById(id);

        if (habit.isPresent()) {
            return ResponseEntity.ok(habit.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Habit> updateHabit(@PathVariable Long id, @RequestBody Habit updatedHabit) {
        Optional<Habit> existingHabit = habitRepository.findById(id);

        if (existingHabit.isPresent()) {
            Habit habit = existingHabit.get();
            habit.setTitle(updatedHabit.getTitle());
            habit.setGoalDays(updatedHabit.getGoalDays());

            Habit savedHabit = habitRepository.save(habit);
            return ResponseEntity.ok(savedHabit);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/status")
    public Habit updateHabitStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        boolean completedToday = body.get("completedToday");
        return habitService.updateHabitStatus(id, completedToday);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHabit(@PathVariable Long id) {
        habitService.deleteHabit(id);
        return ResponseEntity.ok("Habit deleted successfully");
    }
}