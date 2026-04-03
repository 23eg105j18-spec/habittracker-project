package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int streakTarget;
    private String rewardMessage;

    public Long getId() { return id; }

    public int getStreakTarget() { return streakTarget; }

    public String getRewardMessage() { return rewardMessage; }

    public void setStreakTarget(int streakTarget) {
        this.streakTarget = streakTarget;
    }

    public void setRewardMessage(String rewardMessage) {
        this.rewardMessage = rewardMessage;
    }
}