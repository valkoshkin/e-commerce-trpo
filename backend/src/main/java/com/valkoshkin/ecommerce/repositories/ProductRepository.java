package com.valkoshkin.ecommerce.repositories;

import com.valkoshkin.ecommerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findAllByCategoryNameIn(List<String> categoriesNames);

    Optional<Product> findByProductId(Long id);
    void deleteByProductId(Long id);
}
