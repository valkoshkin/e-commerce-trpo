package com.valkoshkin.ecommerce.dto.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewDto {
    private int rating;
    private String content;
    private Long timestamp;
    private String username;
    private Long productId;
}
