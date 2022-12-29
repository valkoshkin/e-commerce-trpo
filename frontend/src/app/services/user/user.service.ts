import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AddToCartResponse,
  AddToFavoritesResponse,
  CreateOrderPayload,
  LinkedProducts,
  MessageWrapper,
  Order,
  User,
  UserData,
} from '../../common/types';

const API_PREFIX = '/api/v1';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addToCart(
    username: string,
    productId: number
  ): Observable<AddToCartResponse> {
    return this.http.post(
      `${API_PREFIX}/user/${username}/cart`,
      productId
    ) as Observable<AddToCartResponse>;
  }

  addToFavorites(
    username: string,
    productId: number
  ): Observable<AddToFavoritesResponse> {
    return this.http.post(
      `${API_PREFIX}/user/${username}/favorites`,
      productId
    ) as Observable<AddToFavoritesResponse>;
  }

  fetchLinkedProducts(username: string): Observable<LinkedProducts> {
    return this.http.get(
      `${API_PREFIX}/user/${username}/linked-products`
    ) as Observable<LinkedProducts>;
  }

  createOrder(
    username: string,
    payload: CreateOrderPayload
  ): Observable<MessageWrapper> {
    return this.http.post(
      `${API_PREFIX}/user/${username}/orders`,
      payload
    ) as Observable<MessageWrapper>;
  }

  fetchUserData(username: string): Observable<UserData> {
    return this.http.get(
      `${API_PREFIX}/user/${username}`
    ) as Observable<UserData>;
  }

  fetchOrders(username: string): Observable<Order[]> {
    return this.http.get(`${API_PREFIX}/user/${username}/orders`) as Observable<
      Order[]
    >;
  }
}
