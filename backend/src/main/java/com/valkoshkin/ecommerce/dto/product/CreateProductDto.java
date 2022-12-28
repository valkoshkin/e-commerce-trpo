package com.valkoshkin.ecommerce.dto.product;

import com.valkoshkin.ecommerce.entities.Category;
import com.valkoshkin.ecommerce.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductDto {
    protected String name;
    protected String description;
    protected double price;
    protected String category;

    public Product toProduct(Category category) {
        return new Product(name, description, price, category);
    }
}
