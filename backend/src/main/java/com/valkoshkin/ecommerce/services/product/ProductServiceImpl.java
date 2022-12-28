package com.valkoshkin.ecommerce.services.product;

import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts(List<String> categories) {
        return categories != null && categories.size() > 0 ? productRepository.findAllByCategoryNameIn(categories) : productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findByProductId(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteByProductId(id);
    }
}
