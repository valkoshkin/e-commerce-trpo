package com.valkoshkin.ecommerce.repositories;

import com.valkoshkin.ecommerce.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findFirstByName(String name);
}
