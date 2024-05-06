import { IProduct } from './iproduct';

export interface IproductPage {
  currentPage: number;
  totalPages: number;
  products: IProduct[];
}
