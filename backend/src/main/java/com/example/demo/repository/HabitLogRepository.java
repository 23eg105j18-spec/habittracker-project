package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.HabitLog;

public interface HabitLogRepository extends JpaRepository<HabitLog, Long> {

    List<HabitLog> findByDate(LocalDate date);

    List<HabitLog> findByCompleted(boolean completed);

    List<HabitLog> findByDateAndCompleted(LocalDate date, boolean completed);

}