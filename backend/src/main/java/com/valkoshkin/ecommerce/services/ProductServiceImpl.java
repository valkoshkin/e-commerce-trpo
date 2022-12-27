package com.valkoshkin.ecommerce.services;

import com.valkoshkin.ecommerce.dto.ProductDto;
import com.valkoshkin.ecommerce.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
