package com.valkoshkin.ecommerce.mappers;

import com.valkoshkin.ecommerce.dto.user.UserProfileDto;
import com.valkoshkin.ecommerce.dto.user.UserWithCredentialsDto;
import com.valkoshkin.ecommerce.entities.User;
import com.valkoshkin.ecommerce.entities.enums.UserRole;
import com.valkoshkin.ecommerce.services.UserDetailsImpl;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserMappers {
    public static UserProfileDto mapUserDetailsToUserProfileDto(UserDetailsImpl userDetails, String role, String token) {
        if (userDetails == null) {
            return null;
        }
        return new UserProfileDto(
                userDetails.getUserId(),
                userDetails.getUsername(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                userDetails.getEmail(),
                userDetails.getAddress(),
                role,
                token
        );
    }

    public static User mapUserWithCredentialsToUser(UserWithCredentialsDto userWithCredentialsDto, UserRole role, PasswordEncoder passwordEncoder) {
        if (userWithCredentialsDto == null) {
            return null;
        }
        return new User(
                userWithCredentialsDto.getUsername(),
                passwordEncoder.encode(userWithCredentialsDto.getPassword()),
                userWithCredentialsDto.getFirstName(),
                userWithCredentialsDto.getLastName(),
                userWithCredentialsDto.getEmail(),
                userWithCredentialsDto.getAddress(),
                role
        );
    }
}
