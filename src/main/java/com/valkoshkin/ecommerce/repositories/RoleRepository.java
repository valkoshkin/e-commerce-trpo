package com.valkoshkin.ecommerce.repositories;

import com.valkoshkin.ecommerce.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
