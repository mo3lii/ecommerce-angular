import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { ProductDashboardService } from '../../../Services/product-dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SliderComponent } from '../slider/slider.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    SliderComponent,
    NgxSkeletonLoaderModule,
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
    this.apiService.getPage(pageNumber).subscribe({
      next: (data) => {
        this.products = data.products;
        this.currentPageNum = data.currentPage;
        this.totalPages = data.totalPages;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.isFailed = true;
      },
    });
  }
  changePage() {
    console.log('current page : ', this.currentPageNum);
    if (this.currentPageNum > this.totalPages)
      this.currentPageNum = this.totalPages;
    this.getproducts(this.currentPageNum);
  }
  decreasePageNum() {
    this.currentPageNum--;
    this.changePage();
  }
  increasePageNum() {
    this.currentPageNum++;
    this.changePage();
  }
  isPrevDisabled() {
    return this.currentPageNum == 1;
  }
  isNextDisabled() {
    return this.currentPageNum == this.totalPages;
  }
}
