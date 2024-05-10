import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/icategory';
import { IcategoryPost } from '../models/icategory-post';

@Injectable({
  providedIn: 'root',
})
export class CategoryDashboardService {
  baseURL: string = 'http://localhost:5174/api/category';
  constructor(private client: HttpClient) {}
  getAll(): Observable<ICategory[]> {
    return this.client.get<ICategory[]>(`${this.baseURL}`);
  }
  add(category: any) {
    return this.client.post<ICategory[]>(`${this.baseURL}`, category);
  }
  delete(id: number) {
    return this.client.delete<ICategory[]>(`${this.baseURL}/${id}`);
  }
  update(id: number, category: any) {
    return this.client.put<ICategory[]>(`${this.baseURL}/${id}`, category);
  }
}
