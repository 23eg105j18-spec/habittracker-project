package com.example.demo.controller;

import com.example.demo.service.RewardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rewards")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @GetMapping("/{streak}")
    public String getReward(@PathVariable int streak){
        return rewardService.checkReward(streak);
    }
}