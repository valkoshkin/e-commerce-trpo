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
    private int userId;
    private String role;

    public UserProfileDto(int userId, String username, String firstName, String lastName, String email, String address, String role) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.role = role;
    }
}
