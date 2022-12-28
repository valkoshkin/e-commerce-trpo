package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.dto.MessageDto;
import com.valkoshkin.ecommerce.dto.product.CreateProductDto;
import com.valkoshkin.ecommerce.dto.product.ProductDto;
import com.valkoshkin.ecommerce.dto.review.ReviewDto;
import com.valkoshkin.ecommerce.entities.Category;
import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.services.category.CategoryService;
import com.valkoshkin.ecommerce.services.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;

    @GetMapping
    public List<ProductDto> getAllProducts(@RequestParam(required = false) List<String> categories) {
        return productService.getAllProducts(categories).stream().map(ProductDto::fromProduct).collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        return ProductDto.fromProduct(productService.getProductById(id));
    }

    @GetMapping(path = "/{productId}/reviews")
    public List<ReviewDto> getReviewsForProduct(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        return product.getReviews().stream().map(ReviewDto::fromReview).collect(Collectors.toList());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody CreateProductDto createProductDto) {
        Category category = categoryService.getCategoryByName(createProductDto.getCategory());
        Product product = createProductDto.toProduct(category);
        productService.save(product);

        return ResponseEntity.ok(new MessageDto("Товар успешно добавлен"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok(new MessageDto("Товар успешно удален"));
    }
}
