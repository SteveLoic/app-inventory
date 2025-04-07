import { ProductResponseInterface } from './product.response.interface';

export interface ProductStateInterface {
  products: ProductResponseInterface[];
  error: any;
  isLoading: boolean;
}
