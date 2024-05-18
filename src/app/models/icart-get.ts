export interface ICartGet {
  id: number;
  name: string;
  type: string;
  productId: number;
  category: string;
  description: string;
  imageURL: string;
  price: number;
  sale?: number; // optional property
  stock: number;
  quantity: number;
  priceAfterSale?: number;
}
