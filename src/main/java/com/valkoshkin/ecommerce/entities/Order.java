package com.valkoshkin.ecommerce.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "date")
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "orders_products",
            joinColumns = { @JoinColumn(name = "order_id") },
            inverseJoinColumns = { @JoinColumn(name = "product_id") })
    private List<Product> orderedProducts;

    public String toString() {
        return String.format("Order {\norderId=%d,\ndate=%s,\nuser=%s\n}",
                orderId, date.toString(), user.toString());
    }
}
