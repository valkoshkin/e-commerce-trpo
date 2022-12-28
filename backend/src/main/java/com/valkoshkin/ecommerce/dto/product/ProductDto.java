package com.valkoshkin.ecommerce.dto.product;

import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.entities.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor()
public class ProductDto extends CreateProductDto {
    private Long productId;
    private List<Review> reviews;

    public ProductDto(Long productId, String name, String description, double price, String category, List<Review> reviews) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.reviews = reviews;
    }

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
