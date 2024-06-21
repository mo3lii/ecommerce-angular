import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocationDataModel } from '../models/Address/i-location-data-model';
import { ICartGet } from '../models/icart-get';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseURL: string = 'http://localhost:5174/api/';

  constructor(private client: HttpClient) {}
  getAllGovernments() {
    return this.client.get<ILocationDataModel[]>(
      'https://atfawry.fawrystaging.com/ECommerceWeb/api/lookups/govs'
    );
  }
  getCityByGovernmentId(id: number) {}
  getAvailableProducts() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('user-token')}`
    );
    return this.client.get<ICartGet[]>(`${this.baseURL}order/products`, {
      headers,
    });
  }
}
