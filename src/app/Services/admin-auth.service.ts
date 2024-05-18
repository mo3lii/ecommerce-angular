import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserToken } from '../models/user-token';
import { UserLogin } from '../models/user-login';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  baseURL: string = 'http://localhost:5174/api/user';
  get isLoggedIn(): boolean {
    return localStorage.getItem('admin-token') !== null;
  }
  constructor(private client: HttpClient) {}
  login(userLogin: UserLogin) {
    return this.client.post<UserToken>(`${this.baseURL}/login`, userLogin);
  }
}
