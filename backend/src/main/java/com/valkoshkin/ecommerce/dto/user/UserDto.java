package com.valkoshkin.ecommerce.dto.user;

import com.valkoshkin.ecommerce.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserDto extends BaseUserDto {
    protected Long userId;

    public UserDto(Long userId, String username, String firstName, String lastName, String email, String address) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
    }

    public static UserDto fromUser(User user) {
        return new UserDto(user.getUserId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getAddress());
    }
}
