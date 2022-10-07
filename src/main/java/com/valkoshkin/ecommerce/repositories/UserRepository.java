package com.valkoshkin.ecommerce.repositories;

import com.valkoshkin.ecommerce.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
