import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IType } from '../models/itype';

@Injectable({
  providedIn: 'root',
})
export class TypeDashboardService {
  baseURL: string = 'http://localhost:5174/api/type';
  constructor(private client: HttpClient) {}
  getAll(): Observable<IType[]> {
    return this.client.get<IType[]>(`${this.baseURL}`);
  }
}
