package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.dto.MessageDto;
import com.valkoshkin.ecommerce.dto.product.CreateProductDto;
import com.valkoshkin.ecommerce.dto.product.EditProductDto;
import com.valkoshkin.ecommerce.dto.product.ProductDto;
import com.valkoshkin.ecommerce.dto.review.ReviewDto;
import com.valkoshkin.ecommerce.entities.Category;
import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.services.category.CategoryService;
import com.valkoshkin.ecommerce.services.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
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
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        try {
            ProductDto result = ProductDto.fromProduct(productService.getProductById(id));
            return ResponseEntity.ok(result);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(path = "/{productId}/reviews")
    public List<ReviewDto> getReviewsForProduct(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        return product.getReviews().stream().map(ReviewDto::fromReview).collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody CreateProductDto createProductDto) {
        Category category = categoryService.getCategoryByName(createProductDto.getCategory());
        Product product = createProductDto.toProduct(category);
        productService.save(product);

        return ResponseEntity.ok(new MessageDto("Товар успешно добавлен"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok(new MessageDto("Товар успешно удален"));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    public ProductDto editProduct(@PathVariable Long id, @RequestBody EditProductDto editProductDto) {
        Product product = productService.getProductById(id);

        product.setName(editProductDto.getName());
        product.setDescription(editProductDto.getDescription());
        product.setPrice(editProductDto.getPrice());
        productService.save(product);

        return ProductDto.fromProduct(product);
    }
}
