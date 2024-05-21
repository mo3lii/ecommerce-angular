import { IProduct } from './../models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRules } from '../Rules/Product.Rules';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL: string = 'http://localhost:5174/api/product';
  constructor(
    private client: HttpClient,
    private rules: ProductRules,
    private userAuth: UserAuthService
  ) {}
  getById(id: number) {
    if (this.userAuth.isLoggedIn) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('user-token')}`
      );
      return this.client.get<IProduct>(`${this.baseURL}/${id}/byuser`, {
        headers,
      });
    }
    return this.client.get<IProduct>(`${this.baseURL}/${id}`);
  }
  getSimilar(id: number) {
    return this.client.get<IProduct[]>(`${this.baseURL}/similar/${id}`);
  }
}
