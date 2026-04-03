package com.example.demo.controller;

import com.example.demo.dto.DashboardDTO;
import com.example.demo.service.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Main dashboard API
    @GetMapping
    public DashboardDTO getDashboard() {
        return dashboardService.getDashboardData();
    }

}