package com.valkoshkin.ecommerce.dto.user;

import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserWithCredentialsDto extends BaseUserDto {
    private String password;
}
