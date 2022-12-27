package com.valkoshkin.ecommerce.services;

import com.valkoshkin.ecommerce.dto.ProductDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts(List<String> categories);
}
