import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProductsTableComponent } from './Components/dashboard/products-table/products-table.component';
import { AdminHomeComponent } from './Components/dashboard/admin-home/admin-home.component';
import { AddProductComponent } from './Components/dashboard/add-product/add-product.component';
import { CategoryTableComponent } from './Components/dashboard/category-table/category-table.component';

export const routes: Routes = [
  { path: '', component: AdminHomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/allproducts', component: ProductsTableComponent },
  { path: 'dashboard/product/:id/edit', component: AddProductComponent },
  { path: 'dashboard/category', component: CategoryTableComponent },
];
