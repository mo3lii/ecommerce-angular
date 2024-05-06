export interface IProduct {
  id: number;
  name: string;
  type: string;
  category: string;
  description: string;
  imageURL?: string;
  price: number;
  sale?: number;
  stock: number;
  dateCreated: Date;
}
