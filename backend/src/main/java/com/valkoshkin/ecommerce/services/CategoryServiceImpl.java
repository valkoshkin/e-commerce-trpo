package com.valkoshkin.ecommerce.services;

import com.valkoshkin.ecommerce.dto.CategoryDto;
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
    public List<CategoryDto> getCategories() {
        return categoryRepository.findAll().stream().map(CategoryDto::fromCategory).collect(Collectors.toList());
    }
}
