package com.valkoshkin.ecommerce.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    protected String username;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected String address;
}
