package com.valkoshkin.ecommerce.dto.order;

import com.valkoshkin.ecommerce.dto.product.ProductDto;
import com.valkoshkin.ecommerce.dto.user.UserDto;
import com.valkoshkin.ecommerce.entities.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private Long orderId;
    private Long timestamp;
    private UserDto user;
    private List<ProductDto> orderedProducts;
    private double price;

    public static OrderDto fromOrder(Order order) {
        List<ProductDto> products = order.getOrderedProducts().stream().map(ProductDto::fromProduct).toList();
        double resultPrice = products.stream().mapToDouble(ProductDto::getPrice).sum();
        return new OrderDto(order.getOrderId(), order.getTimestamp(), UserDto.fromUser(order.getUser()),
                order.getOrderedProducts().stream().map(ProductDto::fromProduct).collect(Collectors.toList()), resultPrice);
    }
}
