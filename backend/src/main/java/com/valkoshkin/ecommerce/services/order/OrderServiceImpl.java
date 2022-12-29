package com.valkoshkin.ecommerce.services.order;

import com.valkoshkin.ecommerce.entities.Order;
import com.valkoshkin.ecommerce.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    @Override
    public void save(Order order) {
        orderRepository.save(order);
    }
}
