package com.valkoshkin.ecommerce.entities;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "categories")
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private List<Product> products;

    public Category(Long categoryId, String name) {
        this.categoryId = categoryId;
        this.name = name;
    }

    public String toString() {
        return String.format("Category {\ncategoryId=%d,\nname=%s\n}", categoryId, name);
    }

}
