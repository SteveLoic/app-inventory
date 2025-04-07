import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductStateInterface } from '../types/product.state.interface';
import { productActions } from './actions';
import { ProductResponseInterface } from '../types/product.response.interface';

const initialState: ProductStateInterface = {
  products: [],
  error: undefined,
  isLoading: false,
};

const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productActions.getAllProduct, productActions.addProduct, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(productActions.getAllProductSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      products: [...action.products],
    })),
    on(productActions.addProductSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      products: [action.product, ...state.products],
    })),
    on(productActions.editProductSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      products: updateExistingsItem(state.products, action.product),
    }))
  ),
});

const updateExistingsItem = (
  items: ProductResponseInterface[],
  updateItem: ProductResponseInterface
) => {
  const foundIndex = items.findIndex((item) => item.id === updateItem.id);
  const newArray = [...items];
  newArray[foundIndex] = updateItem;
  return newArray;
};

export const {
  name: productFeatureKey,
  reducer: productReducer,
  selectError,
  selectIsLoading,
  selectProducts,
} = productFeature;
