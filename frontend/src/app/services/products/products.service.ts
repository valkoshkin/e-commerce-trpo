import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateProductPayload,
  MessageWrapper,
  Product,
} from '../../common/types';

const API_PREFIX = '/api/v1';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchCategories(): Observable<string[]> {
    return this.http.get(`${API_PREFIX}/categories`) as Observable<string[]>;
  }

  fetchProducts(categories: string[]): Observable<Product[]> {
    const paramsObject = {
      ...(categories.length && { categories: categories.toString() }),
    };
    const params = new HttpParams({ fromObject: paramsObject });
    return this.http.get(`${API_PREFIX}/products`, { params }) as Observable<
      Product[]
    >;
  }

  fetchProduct(productId: number): Observable<Product> {
    return this.http.get(`${API_PREFIX}/products/${productId}`) as Observable<Product>;
  }

  createProduct(payload: CreateProductPayload): Observable<MessageWrapper> {
    return this.http.post(`${API_PREFIX}/products/create`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }) as Observable<MessageWrapper>;
  }
}
