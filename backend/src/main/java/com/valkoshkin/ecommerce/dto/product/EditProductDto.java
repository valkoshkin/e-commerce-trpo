package com.valkoshkin.ecommerce.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditProductDto {
    protected String name;
    protected String description;
    protected double price;
}
