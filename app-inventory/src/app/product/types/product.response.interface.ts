export interface ProductResponseInterface {
  id: string;
  categoryId: string;
  supplierId: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  description: string;
  imageUrl: string;
  expiryDate?: string;
}
