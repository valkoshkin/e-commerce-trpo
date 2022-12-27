import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

const API_PREFIX = '/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  fetchCategories(): Observable<any> {
    return this.http.get(`${API_PREFIX}/categories`)
  }

  fetchProducts(categories: string[]): Observable<any> {
    const paramsObject = {
      ...(categories.length && {categories: categories.toString()})
    };
    const params = new HttpParams({fromObject: paramsObject});
    return this.http.get(`${API_PREFIX}/products`, {params})
  }
}
