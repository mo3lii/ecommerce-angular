import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, LogoComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  cartCounter: number = 0;
  constructor(private apiService: CartService) {}
  ngOnInit(): void {
    this.apiService.getUserCart().subscribe({
      next: (data) => {
        data.forEach((element) => {
          this.cartCounter += element.quantity;
        });
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
