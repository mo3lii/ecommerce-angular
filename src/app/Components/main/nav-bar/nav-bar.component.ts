import { CartService } from './../../../Services/cart.service';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';
import { CartCountService } from '../../../Services/cart-count.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  cartCount: number = 0;

  constructor(
    private cartCountService: CartCountService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getCartCount().subscribe({
      next: (count) => {
        this.cartCount = count;
      },
    });
    this.cartCountService.cartUpdateSubject.subscribe(() => {
      console.log('Received cart update notification.');
      // Fetch the updated cart count from the API
      this.cartService.getCartCount().subscribe((count) => {
        console.log('Fetched cart count:', count);

        this.cartCount = count;
      });
    });
  }
}
