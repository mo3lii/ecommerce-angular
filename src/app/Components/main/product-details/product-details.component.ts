import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { CartService } from '../../../Services/cart.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartCountService } from '../../../Services/cart-count.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, TruncatePipe, ProductCardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product?: IProduct;
  id?: number;
  products: IProduct[] = [];
  isAddedToCart: boolean = false;
  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private apiService: ProductService,
    private viewportScroller: ViewportScroller,
    private cartCountService: CartCountService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        if (this.id) {
          this.getProductDetails(this.id);
          this.getproducts(this.id);
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      },
    });
  }
  addToCart(id?: number) {
    if (id) {
      this.cartService.addProduct(id).subscribe({
        next: () => {
          this.isAddedToCart = true;
          this.cartCountService.notifyCartUpdate();
        },
      });
    }
  }
  getproducts(id: number) {
    this.apiService.getSimilar(id).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {},
    });
  }
  getProductDetails(id: number) {
    this.apiService.getById(id).subscribe({
      next: (prod) => {
        this.product = prod;
        console.log(prod);
      },
    });
  }
}
