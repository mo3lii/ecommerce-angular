import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';
import { CartService } from '../../../Services/cart.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LogoComponent,
    NavBarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  cartCounter: number = 0;
  constructor(private apiService: CartService) {}
  ngOnInit(): void {
    this.getCartCount();
  }
  getCartCount() {
    this.apiService.getCartCount().subscribe({
      next: (data) => {
        this.cartCounter = data;
      },
    });
  }
}
