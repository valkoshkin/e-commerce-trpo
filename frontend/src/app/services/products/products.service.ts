import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProductPayload } from '../../common/types';

const API_PREFIX = '/api/v1';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchCategories(): Observable<any> {
    return this.http.get(`${API_PREFIX}/categories`);
  }

  fetchProducts(categories: string[]): Observable<any> {
    const paramsObject = {
      ...(categories.length && { categories: categories.toString() }),
    };
    const params = new HttpParams({ fromObject: paramsObject });
    return this.http.get(`${API_PREFIX}/products`, { params });
  }

  createProduct(payload: CreateProductPayload): Observable<any> {
    return this.http.post(`${API_PREFIX}/products/create`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
