import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductResponseInterface } from '../types/product.response.interface';
import { ProductRequestInterface } from '../types/product.request.interface';

export const productActions = createActionGroup({
  source: 'product',
  events: {
    'get all product': emptyProps(),
    'get all product success': props<{
      products: ProductResponseInterface[];
    }>(),
    'add product': props<{
      product: ProductRequestInterface;
    }>(),
    'add product success': props<{ product: ProductResponseInterface }>(),
    'edit product': props<{ product: ProductRequestInterface }>(),
    'edit product success': props<{ product: ProductResponseInterface }>(),
    'delete product': props<{ productId: string }>(),
    'product error': props<{ errors: any }>(),
    'add image': props<{
      image: File;
      productId: string;
    }>(),
    'add image success': emptyProps(),
  },
});
