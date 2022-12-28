package com.valkoshkin.ecommerce.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseUserDto  {
    protected String username;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected String address;
}
