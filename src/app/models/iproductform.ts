export interface Iproductform {
  name: string;
  typeId: number;
  categoryId: number;
  description: string;
  price: number;
  sale?: number | null;
  stock: number;
}
