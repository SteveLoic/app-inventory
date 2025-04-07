import { createSelector } from '@ngrx/store';
import { selectProducts } from './reducer';

export const getProductById = (productId: string) =>
  createSelector(selectProducts, (products) => {
    return products.find((product) => Number(product.id) === Number(productId));
  });
