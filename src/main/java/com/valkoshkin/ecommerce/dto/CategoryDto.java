package com.valkoshkin.ecommerce.dto;

import com.valkoshkin.ecommerce.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryDto {
    private Long categoryId;
    private String name;

    public static CategoryDto fromCategory(Category category) {
        return new CategoryDto(category.getCategoryId(), category.getName());
    }
}
