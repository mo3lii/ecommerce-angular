import { ProductRules } from './../Rules/Product.Rules';
import { IProduct } from './../models/iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IproductPage } from '../models/iproduct-page';
import { IproductEdit } from '../models/iproduct-edit';

@Injectable({
  providedIn: 'root',
})
export class ProductDashboardService {
  baseURL: string = 'http://localhost:5174/api/product';
  constructor(private client: HttpClient, private rules: ProductRules) {}
  getPage(pageNumber: number): Observable<IproductPage> {
    return this.client.get<IproductPage>(
      `${this.baseURL}?page=${pageNumber}&pagesize=${this.rules.productTablePageSize}`
    );
  }
  getById(id: number) {
    return this.client.get<IproductEdit>(`${this.baseURL}/${id}`);
  }
  add(product: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('Name', product.name);
    formData.append('TypeId', product.typeId.toString());
    formData.append('CategoryId', product.categoryId.toString());
    formData.append('Description', product.description);
    formData.append('Price', product.price.toString());
    if (product.sale !== null && product.sale !== undefined) {
      formData.append('Sale', product.sale.toString());
    }
    formData.append('Stock', product.stock.toString());
    if (file) {
      formData.append('Image', file, file.name);
    }

    return this.client.post(this.baseURL, formData);
  }
  update(id: number, product: any, file?: File) {
    const formData = new FormData();
    formData.append('Name', product.name);
    formData.append('TypeId', product.typeId.toString());
    formData.append('CategoryId', product.categoryId.toString());
    formData.append('Description', product.description);
    formData.append('Price', product.price.toString());
    if (product.sale !== null && product.sale !== undefined) {
      formData.append('Sale', product.sale.toString());
    }
    formData.append('Stock', product.stock.toString());
    if (file != undefined) {
      formData.append('Image', file, file.name);
    }

    return this.client.put(`${this.baseURL}/${id}`, formData);
  }
  delete(id: number) {
    return this.client.delete(`${this.baseURL}/${id}`);
  }
}
