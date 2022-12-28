package com.valkoshkin.ecommerce.services.user;

import com.valkoshkin.ecommerce.entities.User;

public interface UserService {
    User getUserByUsername(String username);
    boolean existsByUsernameOrEmail(String username, String email);
    void save(User user);
}
