import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartCountService {
  cartUpdateSubject = new Subject<void>();

  notifyCartUpdate() {
    this.cartUpdateSubject.next();
  }
}
