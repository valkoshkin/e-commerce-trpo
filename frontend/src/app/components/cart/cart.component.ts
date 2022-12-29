import { Component, OnInit } from '@angular/core';
import {AddToCartResponse, AddToFavoritesResponse, LinkedProducts, Product} from '../../common/types';
import { UserService } from '../../services/user/user.service';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {TokenStorageService} from "../../services/token-storage/token-storage.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  favorites: Product[] = [];

  loading: boolean = false;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private notification: NzNotificationService
  ) {}

  private fetchLinkedProducts(username: string) {
    this.loading = true;
    const observer: Partial<Observer<LinkedProducts>> = {
      next: (response: LinkedProducts) => {
        this.cart = response.cart;
        this.favorites = response.favorites;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.notification.error('Ошибка', error.error.message || error.message);
      },
    };

    this.userService.fetchLinkedProducts(username).subscribe(observer);
  }

  ngOnInit(): void {
    const username = this.tokenStorage.getUser()!.username;
    this.fetchLinkedProducts(username);
  }

  isProductInFavorites(productId: number): boolean {
    return this.favorites.some(
      (product: Product) => product.productId === productId
    );
  }

  addToFavorites(productId: number): void {
    const observer: Partial<Observer<AddToFavoritesResponse>> = {
      next: (response: AddToFavoritesResponse) => {
        this.favorites = response.favorites;
      },
      error: (error: HttpErrorResponse) => {
        this.notification.error('Ошибка', error.error.message || error.message);
      },
    };
    const username = this.tokenStorage.getUser()!.username;
    this.userService.addToFavorites(username, productId).subscribe(observer);
  }

  removeFromCart(productId: number): void {
    const observer: Partial<Observer<AddToCartResponse>> = {
      next: (response: AddToCartResponse) => {
        this.cart = response.cart;
      },
      error: (error: HttpErrorResponse) => {
        this.notification.error('Ошибка', error.error.message || error.message);
      },
    };
    const username = this.tokenStorage.getUser()!.username;
    this.userService.addToCart(username, productId).subscribe(observer);
  }
}
