package com.example.demo.service;

import com.example.demo.model.Reward;
import com.example.demo.repository.RewardRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardService {

    @Autowired
    private RewardRepository rewardRepository;

    public String checkReward(int currentStreak){

        Reward reward = rewardRepository.findByStreakTarget(currentStreak);

        if(reward != null){
            return "🎉 Reward Unlocked: " + reward.getRewardMessage();
        }

        return "No reward yet. Keep going!";
    }
}