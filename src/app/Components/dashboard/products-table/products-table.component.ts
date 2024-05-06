import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { ProductDashboardService } from '../../../Services/product-dashboard.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-table',
  standalone: true,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TruncatePipe,
    FormsModule,
  ],
})
export class ProductsTableComponent implements OnInit {
  products: IProduct[];
  currentPageNum: number = 1;
  totalPages: number = 1;
  currentProduct?: IProduct;
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
      },
      error: () => {},
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
