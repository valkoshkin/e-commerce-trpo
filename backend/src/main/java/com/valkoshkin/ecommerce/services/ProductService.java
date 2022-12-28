package com.valkoshkin.ecommerce.services;

import com.valkoshkin.ecommerce.dto.product.ProductDto;
import com.valkoshkin.ecommerce.entities.Product;

import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts(List<String> categories);
    void save(Product product);
}
