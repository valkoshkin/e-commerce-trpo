package com.valkoshkin.ecommerce.dto.user;

import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserWithCredentialsDto extends UserDto {
    private String password;
}
