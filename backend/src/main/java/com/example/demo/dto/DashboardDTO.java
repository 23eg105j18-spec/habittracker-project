package com.example.demo.dto;

public class DashboardDTO {

    private String message;
    private long totalHabits;
    private long completedToday;
    private int currentStreak;
    private double successRate;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTotalHabits() {
        return totalHabits;
    }

    public void setTotalHabits(long totalHabits) {
        this.totalHabits = totalHabits;
    }

    public long getCompletedToday() {
        return completedToday;
    }

    public void setCompletedToday(long completedToday) {
        this.completedToday = completedToday;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
    }

    public double getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(double successRate) {
        this.successRate = successRate;
    }
}