package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/add")
    public Category addCategory(@RequestBody Category category){
        return categoryRepository.save(category);
    }

    @GetMapping
    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }
}