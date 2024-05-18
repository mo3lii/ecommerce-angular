import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../models/user-token';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  baseURL: string = 'http://localhost:5174/api/user';

  constructor(private client: HttpClient) {}
  get isLoggedIn(): boolean {
    return localStorage.getItem('user-token') !== null;
  }
  login(userLogin: UserLogin) {
    return this.client.post<UserToken>(`${this.baseURL}/login`, userLogin);
  }
}
