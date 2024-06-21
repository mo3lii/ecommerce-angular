import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../models/user-token';
import { IuserRegister } from '../models/iuser-register';

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
  register(user: IuserRegister) {
    return this.client.post<any>(`${this.baseURL}/register`, user);
  }
  checkEmail(email: string) {
    return this.client.post(`${this.baseURL}/checkmail`, { email });
  }
}
