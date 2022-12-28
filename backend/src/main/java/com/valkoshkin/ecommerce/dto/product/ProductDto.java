package com.valkoshkin.ecommerce.dto.product;

import com.valkoshkin.ecommerce.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor()
public class ProductDto extends CreateProductDto {
    private Long productId;

    public ProductDto(Long productId, String name, String description, double price, String category) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    public static ProductDto fromProduct(Product product) {
        return new ProductDto(
                product.getProductId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory().getName());
    }
}
