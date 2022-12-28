package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.services.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public List<String> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
