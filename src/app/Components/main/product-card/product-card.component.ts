import { Component, Input } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product?: IProduct;
}
