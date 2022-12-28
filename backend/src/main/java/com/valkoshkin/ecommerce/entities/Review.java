package com.valkoshkin.ecommerce.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "reviews")
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "content")
    private String content;

    @Column(name = "timestamp")
    private Long timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public Review(int rating, String content, Long timestamp, User user, Product product) {
        this.rating = rating;
        this.content = content;
        this.timestamp = timestamp;
        this.user = user;
        this.product = product;
    }

    public String toString() {
        return String.format("Review {\nreviewId=%d,\nrating=%s,\ncontent=%s,\ndate=%s,\nauthor=%s,\nproduct=%s\n}",
                reviewId, rating, content, timestamp.toString(), user.toString(), product.toString());
    }
}
