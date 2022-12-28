package com.valkoshkin.ecommerce.services;

import com.valkoshkin.ecommerce.entities.Category;
import com.valkoshkin.ecommerce.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<String> getAllCategories() {
        return categoryRepository.findAll().stream().map(Category::getName).collect(Collectors.toList());
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findFirstByName(name);
    }

}
