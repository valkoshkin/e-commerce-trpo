package com.valkoshkin.ecommerce.repositories;

import com.valkoshkin.ecommerce.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
