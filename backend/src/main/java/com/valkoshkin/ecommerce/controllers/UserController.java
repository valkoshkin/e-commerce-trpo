package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.dto.AddToCartResponseDto;
import com.valkoshkin.ecommerce.dto.AddToFavoritesResponseDto;
import com.valkoshkin.ecommerce.dto.LinkedProductsDto;
import com.valkoshkin.ecommerce.dto.product.ProductDto;
import com.valkoshkin.ecommerce.entities.Product;
import com.valkoshkin.ecommerce.entities.User;
import com.valkoshkin.ecommerce.services.product.ProductService;
import com.valkoshkin.ecommerce.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ProductService productService;

    @PostMapping("/{username}/cart")
    public AddToCartResponseDto addToCart(@PathVariable String username, @RequestBody Long productId) {
        User user = userService.getUserByUsername(username);
        Product product = productService.getProductById(productId);
        boolean isAdded;

        if (user.getCart().contains(product)) {
            user.getCart().remove(product);
            isAdded = false;
        } else {
            user.getCart().add(product);
            isAdded = true;
        }

        userService.save(user);

        String message = isAdded
                ? String.format("%s успешно добавлен в корзину", product.getName())
                : String.format("%s успешно удален из корзины", product.getName());
        return new AddToCartResponseDto(message, user.getCart()
                .stream().map(ProductDto::fromProduct).collect(Collectors.toList()));
    }

    @PostMapping("/{username}/favorites")
    public AddToFavoritesResponseDto addToFavorites(@PathVariable String username, @RequestBody Long productId) {
        User user = userService.getUserByUsername(username);
        Product product = productService.getProductById(productId);

        if (user.getLikedProducts().contains(product)) {
            user.getLikedProducts().remove(product);
        } else {
            user.getLikedProducts().add(product);
        }
        userService.save(user);

        return new AddToFavoritesResponseDto(user.getLikedProducts().stream().map(ProductDto::fromProduct).collect(Collectors.toList()));
    }

    @GetMapping("/{username}/linked-products")
    public LinkedProductsDto getLinkedProducts(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return new LinkedProductsDto(
                user.getLikedProducts().stream().map(ProductDto::fromProduct).collect(Collectors.toList()),
                user.getCart().stream().map(ProductDto::fromProduct).collect(Collectors.toList()));
    }
}
