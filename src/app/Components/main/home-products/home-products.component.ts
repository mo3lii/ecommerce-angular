import { Component, Injectable, OnInit } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { ProductDashboardService } from '../../../Services/product-dashboard.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SliderComponent } from '../slider/slider.component';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryDashboardService } from '../../../Services/category-dashboard.service';
import { ICategory } from '../../../models/icategory';
import { TypeDashboardService } from '../../../Services/type-dashboard.service';
import { IType } from '../../../models/itype';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CardLoaderComponent } from '../card-loader/card-loader.component';
@Component({
  selector: 'app-home-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductCardComponent,
    SliderComponent,
    MatFormFieldModule,
    MatSelectModule,
    SearchBarComponent,
    CardLoaderComponent,
  ],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit {
  products: IProduct[];
  currentPageNum: number = 1;
  totalPages: number = 1;
  currentProduct?: IProduct;
  isLoading = true;
  isFailed = false;
  constructor(public apiService: ProductDashboardService) {
    this.products = [];
  }
  ngOnInit(): void {
    this.getproducts(this.currentPageNum);
  }

  getproducts(pageNumber: number) {
    this.isLoading = true;
    this.apiService.getPage(pageNumber).subscribe({
      next: (data) => {
        this.products = data.products;
        this.currentPageNum = data.currentPage;
        this.totalPages = data.totalPages;
        this.updatePagesList();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.isFailed = true;
      },
    });
  }
  changePage(pageNum: number) {
    this.isLoading = true;
    if (this.currentPageNum > this.totalPages)
      this.currentPageNum = this.totalPages;
    this.currentPageNum = pageNum;
    this.getproducts(this.currentPageNum);
  }
  pagesList: number[] = [];
  updatePagesList() {
    this.pagesList = [];
    if (this.totalPages >= 3) {
      if (this.currentPageNum == 1) {
        this.pagesList = [1, 2, 3];
      } else if (this.currentPageNum == this.totalPages) {
        this.pagesList = [
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages,
        ];
      } else {
        this.pagesList = [
          this.currentPageNum - 1,
          this.currentPageNum,
          this.currentPageNum + 1,
        ];
      }
    } else {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pagesList.push(i);
      }
    }
  }
  decreasePageNum() {
    this.changePage(this.currentPageNum - 1);
  }
  increasePageNum() {
    this.changePage(this.currentPageNum + 1);
  }
  isPrevDisabled() {
    return this.currentPageNum == 1;
  }
  isNextDisabled() {
    return this.currentPageNum == this.totalPages;
  }
  SearchByName(searchWord: string) {
    this.isFailed = false;
    this.IsNoSearchResult = false;
    this.isLoading = true;
    if (searchWord.trim() == '') {
      this.getproducts(this.currentPageNum);
    } else {
      this.apiService.getSearchPage(this.currentPageNum, searchWord).subscribe({
        next: (data) => {
          console.log(data);
          this.products = data.products;
          if (this.products.length == 0) {
            this.IsNoSearchResult = true;
          }
          this.currentPageNum = data.currentPage;
          this.totalPages = data.totalPages;
          this.updatePagesList();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.isFailed = true;
        },
      });
    }
  }
  searchWord: string = '';
  IsNoSearchResult: boolean = false;
  boundSearchByName = (searchWord: string) => {
    console.log('callback called');
    this.SearchByName(searchWord);
  };
}
