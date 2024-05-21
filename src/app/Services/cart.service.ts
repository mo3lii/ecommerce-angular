import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartGet } from '../models/icart-get';
import { IqtyUpdate } from '../models/iqty-update';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseURL: string = 'http://localhost:5174/api/';

  constructor(private client: HttpClient) {}
  getUserCart() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('user-token')}`
    );
    return this.client.get<ICartGet[]>(`${this.baseURL}cart`, { headers });
  }
  getCartCount() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('user-token')}`
    );
    return this.client.get<number>(`${this.baseURL}cart/count`, { headers });
  }
  updateCartQty(qtyUpdate: IqtyUpdate) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('user-token')}`
    );
    return this.client.put(`${this.baseURL}cart`, qtyUpdate, {
      headers,
    });
  }
  addProduct(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('user-token')}`
    );
    return this.client.post(`${this.baseURL}cart`, id, {
      headers,
    });
  }
  deleteProduct(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('user-token')}`
    );
    return this.client.delete(`${this.baseURL}cart?id=${id}`, {
      headers,
    });
  }
}
