package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.dto.ProductDto;
import com.valkoshkin.ecommerce.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<ProductDto> getAllProducts(@RequestParam(required = false) List<String> categories) {
        return productService.getAllProducts(categories);
    }
}
