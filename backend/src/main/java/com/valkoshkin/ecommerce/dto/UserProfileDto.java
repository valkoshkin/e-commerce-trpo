package com.valkoshkin.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto extends UserDto {
    private Long userId;
    private String role;
    private String token;

    public UserProfileDto(Long userId, String username, String firstName, String lastName, String email, String address, String role, String token) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.role = role;
        this.token = token;
    }
}
