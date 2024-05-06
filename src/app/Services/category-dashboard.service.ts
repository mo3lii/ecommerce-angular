import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryDashboardService {
  baseURL: string = 'http://localhost:5174/api/category';
  constructor(private client: HttpClient) {}
  getAll(): Observable<ICategory[]> {
    return this.client.get<ICategory[]>(`${this.baseURL}`);
  }
}
