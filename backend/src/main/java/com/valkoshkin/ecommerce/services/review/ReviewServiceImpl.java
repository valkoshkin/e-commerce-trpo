package com.valkoshkin.ecommerce.services.review;

import com.valkoshkin.ecommerce.entities.Review;
import com.valkoshkin.ecommerce.repositories.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    @Override
    public void save(Review review) {
        reviewRepository.save(review);
    }
}
