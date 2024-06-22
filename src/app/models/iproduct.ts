export interface IProduct {
  id: number;
  name: string;
  type: string;
  typeId: number;
  category: string;
  categoryId: number;
  description: string;
  imageURL?: string;
  price: number;
  sale?: number;
  stock: number;
  dateCreated: Date;
  isAddedToCart: boolean;
}
