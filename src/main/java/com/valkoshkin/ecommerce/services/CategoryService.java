package com.valkoshkin.ecommerce.services;

import com.valkoshkin.ecommerce.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getCategories();
}
