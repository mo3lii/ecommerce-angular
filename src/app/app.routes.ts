import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProductsTableComponent } from './Components/dashboard/products-table/products-table.component';
import { AdminHomeComponent } from './Components/dashboard/admin-home/admin-home.component';
import { AddProductComponent } from './Components/dashboard/add-product/add-product.component';
import { CategoryTableComponent } from './Components/dashboard/category-table/category-table.component';
import { AdminLoginComponent } from './Components/dashboard/admin-login/admin-login.component';
import { adiminAuthGuard } from './Gaurds/adimin-auth.guard';
import { LayoutComponent } from './Components/main/layout/layout.component';
import { HomeProductsComponent } from './Components/main/home-products/home-products.component';
import { UserLoginComponent } from './Components/main/user-login/user-login.component';
import { CartComponent } from './Components/main/cart/cart.component';
import { ProductDetailsComponent } from './Components/main/product-details/product-details.component';
import { OrderCheckoutComponent } from './Components/main/order-checkout/order-checkout.component';
import { UserRegisterComponent } from './Components/main/user-register/user-register.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeProductsComponent },
      { path: '', component: HomeProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderCheckoutComponent },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
    ],
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'user/login',
    component: UserLoginComponent,
  },
  {
    path: 'user/register',
    component: UserRegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [adiminAuthGuard],
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'allproducts',
        component: ProductsTableComponent,
      },
      {
        path: 'product/:id/edit',
        component: AddProductComponent,
      },
      {
        path: 'category',
        component: CategoryTableComponent,
      },
    ],
  },
];
