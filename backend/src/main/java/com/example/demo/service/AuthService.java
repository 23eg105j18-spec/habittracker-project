package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Register user
    public String register(User user) {
        userRepository.save(user);
        return "User Registered Successfully";
    }

    // Login using username + password
    public String login(User user) {

        User existingUser = userRepository.findByName(user.getName());

        if (existingUser == null) {
            return "User not found";
        }

        if (existingUser.getPassword().equals(user.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid password";
        }
    }
}