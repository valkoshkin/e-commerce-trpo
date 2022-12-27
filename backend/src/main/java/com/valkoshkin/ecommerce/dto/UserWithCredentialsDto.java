package com.valkoshkin.ecommerce.dto;

import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserWithCredentialsDto extends UserDto {
    private String password;
}
