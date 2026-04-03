package com.example.demo.service;

import com.example.demo.repository.BadgeRepository;
import org.springframework.stereotype.Service;

@Service
public class BadgeService {

    private final BadgeRepository badgeRepository;

    public BadgeService(BadgeRepository badgeRepository) {
        this.badgeRepository = badgeRepository;
    }

}