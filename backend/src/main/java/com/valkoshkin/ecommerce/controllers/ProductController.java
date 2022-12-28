package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.dto.MessageDto;
import com.valkoshkin.ecommerce.dto.product.CreateProductDto;
import com.valkoshkin.ecommerce.dto.product.ProductDto;
import com.valkoshkin.ecommerce.entities.Category;
import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.services.CategoryService;
import com.valkoshkin.ecommerce.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;

    @GetMapping
    public List<ProductDto> getAllProducts(@RequestParam(required = false) List<String> categories) {
        return productService.getAllProducts(categories);
    }

    @GetMapping(path = "/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody CreateProductDto createProductDto) {
        Category category = categoryService.getCategoryByName(createProductDto.getCategory());
        Product product = createProductDto.toProduct(category);
        productService.save(product);

        return ResponseEntity.ok(new MessageDto("Product added successfully"));
    }
}
