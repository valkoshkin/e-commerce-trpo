package com.valkoshkin.ecommerce.services.product;

import com.valkoshkin.ecommerce.entities.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts(List<String> categories);
    Product getProductById(Long id);
    void save(Product product);
}
