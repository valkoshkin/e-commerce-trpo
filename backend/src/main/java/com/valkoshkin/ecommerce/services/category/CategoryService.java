package com.valkoshkin.ecommerce.services.category;

import com.valkoshkin.ecommerce.entities.Category;

import java.util.List;

public interface CategoryService {
    List<String> getAllCategories();
    Category getCategoryByName(String name);
}
