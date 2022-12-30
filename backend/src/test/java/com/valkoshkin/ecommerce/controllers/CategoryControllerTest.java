package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.entities.Category;
import com.valkoshkin.ecommerce.services.category.CategoryService;
import org.assertj.core.util.Arrays;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;


import java.util.ArrayList;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CategoryControllerTest {
    @MockBean
    private CategoryService categoryService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /categories success")
    void getAllCategories() throws Exception {
        // Setup our mocked service
        doReturn(Lists.newArrayList("category1", "category2")).when(categoryService).getAllCategories();

        // Execute the GET request
        mockMvc.perform(get("/api/v1/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0]", is("category1")))
                .andExpect(jsonPath("$[1]", is("category2")));
    }
}