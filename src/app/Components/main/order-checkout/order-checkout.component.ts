import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { ILocationDataModel } from '../../../models/Address/i-location-data-model';
import { ICityDataModel } from '../../../models/Address/i-city-data-model';
import { ICartGet } from '../../../models/icart-get';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';

@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './order-checkout.component.html',
  styleUrl: './order-checkout.component.css',
})
export class OrderCheckoutComponent implements OnInit {
  LocationList: ILocationDataModel[] = [];
  CityList: ICityDataModel[] = [];
  shippingDates: { label: string; date: string }[] = [];
  cartProdList: ICartGet[] = [];
  cartSubtotal: number = 0;
  cartItemsCount: number = 0;
  constructor(
    private orderService: OrderService,
    private apiService: OrderService
  ) {}
  ngOnInit(): void {
    this.orderService.getAllGovernments().subscribe({
      next: (data) => {
        this.LocationList = data;
      },
    });
    this.populateShippingDates();
    this.getAvailableProducts();
  }
  governmentSelected(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    var current = this.LocationList.find(
      (c) => c.id == Number(selectElement.value)
    );
    if (current) {
      this.CityList = current.cityDataModels;
    }
  }
  populateShippingDates() {
    const labels = [
      'Today',
      'Tomorrow',
      'In 2 days',
      'In 3 days',
      'In 4 days',
      'In 5 days',
    ];
    for (let i = 0; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      };

      const formattedDate = date
        .toLocaleDateString('en-US', options)
        .replace(',', ''); // Format date
      const dateString = `${formattedDate.split(' ')[0]}, ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      this.shippingDates.push({ label: labels[i], date: dateString });
    }
  }

  getAvailableProducts() {
    this.apiService.getAvailableProducts().subscribe({
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
}
