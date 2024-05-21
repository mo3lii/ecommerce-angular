import { CartCountService } from './../../../Services/cart-count.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../Services/cart.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe, RouterLink, RouterLinkActive],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product?: IProduct;
  @Input() showButtons = true;
  isAddedToCart: boolean = false;
  constructor(
    private cartService: CartService,
    private CartCountService: CartCountService
  ) {}
  addToCart(id?: number) {
    if (id) {
      this.cartService.addProduct(id).subscribe({
        next: () => {
          this.isAddedToCart = true;
        },
        complete: () => {
          this.CartCountService.notifyCartUpdate();
        },
      });
    }
  }
  navigateToProduct(productId: number | undefined) {
    window.location.href = `/product/${productId}`;
  }
}
