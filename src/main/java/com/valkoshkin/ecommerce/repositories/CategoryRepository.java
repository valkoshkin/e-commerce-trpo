package com.valkoshkin.ecommerce.repositories;

import com.valkoshkin.ecommerce.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
