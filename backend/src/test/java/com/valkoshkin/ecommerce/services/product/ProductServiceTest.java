package com.valkoshkin.ecommerce.services.product;

import com.valkoshkin.ecommerce.entities.Category;
import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.repositories.ProductRepository;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.ArgumentMatchers.any;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class ProductServiceTest {
    @Autowired
    private ProductService productService;

    @MockBean
    private ProductRepository productRepository;

    @Test
    @DisplayName("Test getAllProducts() without categories success")
    void getAllProducts() {
        Category category = new Category(1L, "Category");
        Product product1 = new Product(1L, "Product1", "Description1", 2000.0, category);
        Product product2 = new Product(2L, "Product2", "Description2", 5000, category);
        List<Product> mockedProducts = Lists.newArrayList(product1, product2);
        doReturn(mockedProducts).when(productRepository).findAll();

        List<Product> products = productService.getAllProducts(null);

        assertEquals(2, products.size());
        assertSame(products, mockedProducts);
    }

    @Test
    @DisplayName("Test getAllProducts() with category success")
    void getAllProductsWithCategory() {
        Category category = new Category(1L, "Category");
        Product product1 = new Product(1L, "Product1", "Description1", 2000.0, category);
        Product product2 = new Product(2L, "Product2", "Description2", 5000, category);
        List<Product> sourceProducts = Lists.newArrayList(product1, product2);
        doReturn(sourceProducts).when(productRepository).findAllByCategoryNameIn(Lists.newArrayList("Category"));

        List<Product> returnedProducts = productService.getAllProducts(Lists.newArrayList("Category"));

        assertEquals(2, returnedProducts.size());
        assertSame(returnedProducts, sourceProducts);
    }

    @Test
    @DisplayName("Test getProductById()")
    void getProductById() {
        Category category = new Category(1L, "Category");
        Product sourceProduct = new Product(1L, "Product1", "Description1", 2000.0, category);
        doReturn(Optional.of(sourceProduct)).when(productRepository).findByProductId(1L);

        Product returnedProduct = productService.getProductById(1L);

        assertSame(returnedProduct, sourceProduct);
    }
}