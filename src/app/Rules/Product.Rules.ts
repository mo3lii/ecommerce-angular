import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductRules {
  nameMaxLength: number = 50;
  nameMinLength: number = 10;
  descriptionMaxLength: number = 400;
  descriptionMinLength: number = 50;
  stockMin: number = 1;
  stockMax: number = 99999;
  priceMin: number = 1;
  priceMax: number = 99999;
  saleMin: number = 1;
  saleMax: number = 100;
  productTablePageSize = 8;
}
