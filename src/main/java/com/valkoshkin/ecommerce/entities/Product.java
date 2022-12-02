package com.valkoshkin.ecommerce.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price", nullable = false)
    private double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private List<Review> reviews;

    @ManyToMany(mappedBy = "orderedProducts")
    private List<Order> orders;

    @ManyToMany(mappedBy = "likedProducts")
    private List<User> users;

    public String toString() {
        return String.format("Product {\nproductId=%d,\nname=%s,\ndescription=%s,\nprice=%f,\ncategory=%s\n}",
                productId, name, description, price, category.toString());
    }

}
