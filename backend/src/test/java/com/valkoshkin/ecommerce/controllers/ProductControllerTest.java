package com.valkoshkin.ecommerce.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.valkoshkin.ecommerce.dto.product.CreateProductDto;
import com.valkoshkin.ecommerce.entities.Category;
import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.services.category.CategoryService;
import com.valkoshkin.ecommerce.services.product.ProductService;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import javax.persistence.EntityNotFoundException;

import static org.mockito.ArgumentMatchers.any;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {
    @MockBean
    private ProductService productService;
    @MockBean
    private CategoryService categoryService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /products success")
    void getAllProducts() throws Exception {
        Category category = new Category(1L, "Category");
        Product product1 = new Product(1L, "Product1", "Description1", 2000.0, category);
        Product product2 = new Product(2L, "Product2", "Description2", 5000, category);
        doReturn(Lists.newArrayList(product1, product2)).when(productService).getAllProducts(null);

        mockMvc.perform(get("/api/v1/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].productId", is(1)))
                .andExpect(jsonPath("$[0].name", is("Product1")))
                .andExpect(jsonPath("$[0].description", is("Description1")))
                .andExpect(jsonPath("$[0].price", is(2000.0)))
                .andExpect(jsonPath("$[0].category", is("Category")));
    }

    @Test
    @DisplayName("GET /products/1 success")
    void getProduct() throws Exception {
        Category category = new Category(1L, "Category");
        Product product = new Product(1L, "Product1", "Description1", 2000.0, category);
        doReturn(product).when(productService).getProductById(1L);

        mockMvc.perform(get("/api/v1/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId", is(1)))
                .andExpect(jsonPath("$.name", is("Product1")))
                .andExpect(jsonPath("$.description", is("Description1")))
                .andExpect(jsonPath("$.price", is(2000.0)))
                .andExpect(jsonPath("$.category", is("Category")));
    }

    @Test
    @DisplayName("GET /product/1 - Not Found")
    void getProductNotFound() throws Exception {
        doThrow(new EntityNotFoundException("Product not found with id: 1")).when(productService).getProductById(1L);
        mockMvc.perform(get("/api/v1/products/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /product/create success")
    void createProduct() throws Exception {
        Category category = new Category(1L, "Category1");
        CreateProductDto createProductDto = new CreateProductDto("Product1", "Description1", 2000.0, "Category1");
        doReturn(category).when(categoryService).getCategoryByName(createProductDto.getCategory());
        doNothing().when(productService).save(any());
        mockMvc.perform(post("/api/v1/products/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(createProductDto)))
                .andExpect(status().isOk());

    }

    static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}