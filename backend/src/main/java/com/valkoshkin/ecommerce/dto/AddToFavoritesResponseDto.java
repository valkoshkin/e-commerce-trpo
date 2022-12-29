package com.valkoshkin.ecommerce.dto;

import com.valkoshkin.ecommerce.dto.product.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AddToFavoritesResponseDto {
    private List<ProductDto> favorites;
}
