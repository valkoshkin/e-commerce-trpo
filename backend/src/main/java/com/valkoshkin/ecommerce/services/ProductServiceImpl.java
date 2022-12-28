package com.valkoshkin.ecommerce.services;

import com.valkoshkin.ecommerce.dto.product.ProductDto;
import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> getAllProducts(List<String> categories) {
        return (categories != null && categories.size() > 0 ? productRepository.findAllByCategoryNameIn(categories) : productRepository.findAll())
                .stream().map(ProductDto::fromProduct).collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findByProductId(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        return ProductDto.fromProduct(product);
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }
}
