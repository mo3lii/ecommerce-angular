import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IType } from '../models/itype';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsDashboardService {
  baseURL: string = 'http://localhost:5174/api/type';
  constructor(private client: HttpClient) {}
  getAll(): Observable<IType[]> {
    return this.client.get<IType[]>(`${this.baseURL}`);
  }
  add(type: any) {
    return this.client.post<IType[]>(`${this.baseURL}`, type);
  }
  delete(id: number) {
    return this.client.delete<IType[]>(`${this.baseURL}/${id}`);
  }
  update(id: number, type: any) {
    return this.client.put<IType[]>(`${this.baseURL}/${id}`, type);
  }
}
