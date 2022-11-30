package com.valkoshkin.ecommerce.mappers;

import com.valkoshkin.ecommerce.dto.UserProfileDto;
import com.valkoshkin.ecommerce.dto.UserWithCredentialsDto;
import com.valkoshkin.ecommerce.entities.User;
import com.valkoshkin.ecommerce.entities.enums.UserRole;
import com.valkoshkin.ecommerce.services.UserDetailsImpl;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserMappers {
    public static UserProfileDto mapUserDetailsToUserProfileDto(UserDetailsImpl userDetails, String role) {
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
                role
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
