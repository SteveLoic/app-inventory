import { AuthResponseInterface } from '../../auth/types/auth.response.interface';
import { ProductResponseInterface } from '../../product/types/product.response.interface';
import { SupplierResponseInterface } from '../../supplier/types/supplier.response.interface';

export interface TransactionResponseInterface {
  id: string;
  totalProducts: number;
  totalPrice: number;
  transactionType: string;
  transactionStatus: string;
  user?: AuthResponseInterface;
  product?: ProductResponseInterface;
  supplier?: SupplierResponseInterface;
  description: string;
}
