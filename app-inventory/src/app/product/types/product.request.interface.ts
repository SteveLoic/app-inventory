export interface ProductRequestInterface {
  id?: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  description: string;
  expiryDate?: string;
  categoryId: number;
}
