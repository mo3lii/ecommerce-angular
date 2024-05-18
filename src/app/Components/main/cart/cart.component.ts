import { CommonModule } from '@angular/common';
import { ICartGet } from '../../../models/icart-get';
import { CartService } from './../../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TruncatePipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartProdList: ICartGet[] = [];
  cartSubtotal: number = 0;
  cartItemsCount: number = 0;
  constructor(private apiService: CartService) {}
  ngOnInit(): void {
    this.getCartProducts();
  }
  increaseQty(inputElement: HTMLInputElement) {
    inputElement.value = (Number(inputElement.value) + 1).toString();
    this.triggerChangeEvent(inputElement);
  }
  decreaseQty(inputElement: HTMLInputElement) {
    inputElement.value = (Number(inputElement.value) - 1).toString();
  }
  updateProductQuantity(prodId: number, event: Event) {
    var HTMLInput = event.target as HTMLInputElement;
    this.apiService
      .updateCartQty({
        productId: prodId,
        qty: parseInt(HTMLInput.value, 10),
      })
      .subscribe({
        next: () => {
          this.getCartProducts();
        },
      });
  }
  getCartProducts() {
    this.apiService.getUserCart().subscribe({
      next: (data) => {
        this.cartProdList = data;
        var sum: number = 0;
        var count: number = 0;
        data.forEach((element) => {
          sum +=
            (element.priceAfterSale ? element.priceAfterSale : element.price) *
            element.quantity;
          count += element.quantity;
        });
        this.cartSubtotal = sum;
        this.cartItemsCount = count;
      },
      error: () => {
        console.log('error');
      },
    });
  }
  triggerChangeEvent(inputElement: HTMLInputElement) {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    inputElement.dispatchEvent(event);
  }
}
