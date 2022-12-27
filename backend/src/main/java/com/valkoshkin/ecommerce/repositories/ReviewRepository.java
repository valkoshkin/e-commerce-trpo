package com.valkoshkin.ecommerce.repositories;

import com.valkoshkin.ecommerce.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
