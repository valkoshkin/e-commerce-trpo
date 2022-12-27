package com.valkoshkin.ecommerce.dto;

import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.entities.Review;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProductDto {
    private Long productId;
    private String name;
    private String description;
    private double price;
    private String category;
    private List<Review> reviews;

    public static ProductDto fromProduct(Product product) {
        return new ProductDto(
                product.getProductId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory().getName(),
                product.getReviews());
    }
}
