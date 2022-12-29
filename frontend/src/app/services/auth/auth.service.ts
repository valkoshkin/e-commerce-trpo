import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LoginPayload,
  MessageWrapper,
  RegisterPayload,
} from '../../common/types';

const API_URL = '/api/v1/auth';
const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(
      `${API_URL}/login`,
      payload,
      requestOptions
    );
  }

  logout() {}

  register(payload: RegisterPayload): Observable<MessageWrapper> {
    return this.http.post(
      `${API_URL}/register`,
      payload,
      requestOptions
    ) as Observable<MessageWrapper>;
  }
}
