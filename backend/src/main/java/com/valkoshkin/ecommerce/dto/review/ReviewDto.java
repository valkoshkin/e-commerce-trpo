package com.valkoshkin.ecommerce.dto.review;

import com.valkoshkin.ecommerce.dto.product.ProductDto;
import com.valkoshkin.ecommerce.dto.user.UserDto;
import com.valkoshkin.ecommerce.entities.Review;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor()
public class ReviewDto {
    private Long reviewId;
    private int rating;
    private String content;
    private Long timestamp;
    private UserDto user;
    private ProductDto product;

    public static ReviewDto fromReview(Review review) {
        return new ReviewDto(review.getReviewId(), review.getRating(), review.getContent(), review.getTimestamp(), UserDto.fromUser(review.getUser()), ProductDto.fromProduct(review.getProduct()));
    }
}
