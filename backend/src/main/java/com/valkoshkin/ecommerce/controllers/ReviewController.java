package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.dto.MessageDto;
import com.valkoshkin.ecommerce.dto.review.CreateReviewDto;
import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.entities.Review;
import com.valkoshkin.ecommerce.entities.User;
import com.valkoshkin.ecommerce.services.product.ProductService;
import com.valkoshkin.ecommerce.services.review.ReviewService;
import com.valkoshkin.ecommerce.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final UserService userService;
    private final ProductService productService;
    private final ReviewService reviewService;
    @PostMapping("/create")
    public ResponseEntity<?> createReview(@RequestBody CreateReviewDto createReviewDto) {
        User user = userService.getUserByUsername(createReviewDto.getUsername());
        Product product = productService.getProductById(createReviewDto.getProductId());
        Review review = new Review(createReviewDto.getRating(), createReviewDto.getContent(), createReviewDto.getTimestamp(), user, product);
        reviewService.save(review);

        return ResponseEntity.ok(new MessageDto("Отзыв успешно добавлен"));
    }
}
