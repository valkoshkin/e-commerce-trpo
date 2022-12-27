import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_ORIGIN } from '../../common/constants';
import { Observable } from 'rxjs';
import { LoginPayload, RegisterPayload } from '../../common/types';

const API_URL = '/api/v1/auth';
const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(
      `${SERVER_ORIGIN}${API_URL}/login`,
      payload,
      requestOptions
    );
  }

  logout() {}

  register(payload: RegisterPayload): Observable<Object> {
    return this.http.post(
      `${SERVER_ORIGIN}${API_URL}/register`,
      payload,
      requestOptions
    );
  }
}
