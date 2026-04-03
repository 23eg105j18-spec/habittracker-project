package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "habit")
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Integer goalDays;
    private Boolean completedToday;
    private Integer currentStreak;
    private Integer longestStreak;
    private Long userId;

    public Habit() {
        this.completedToday = false;
        this.currentStreak = 0;
        this.longestStreak = 0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getGoalDays() {
        return goalDays;
    }

    public void setGoalDays(Integer goalDays) {
        this.goalDays = goalDays;
    }

    public Boolean getCompletedToday() {
        return completedToday;
    }

    public void setCompletedToday(Boolean completedToday) {
        this.completedToday = completedToday;
    }

    public Integer getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(Integer currentStreak) {
        this.currentStreak = currentStreak;
    }

    public Integer getLongestStreak() {
        return longestStreak;
    }

    public void setLongestStreak(Integer longestStreak) {
        this.longestStreak = longestStreak;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}