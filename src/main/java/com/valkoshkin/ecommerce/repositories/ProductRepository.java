package com.valkoshkin.ecommerce.repositories;

import com.valkoshkin.ecommerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
