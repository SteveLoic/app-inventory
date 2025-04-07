import { createFeature, createReducer, on } from '@ngrx/store';
import { SupplierStateInterface } from '../types/supplier.state.interface';

import { supplierActions } from './actions';
import { SupplierResponseInterface } from '../types/supplier.response.interface';

const initialState: SupplierStateInterface = {
  suppliers: [],
  isLoadding: false,
  error: undefined,
};

const supplierFeature = createFeature({
  name: 'supplier',
  reducer: createReducer(
    initialState,
    on(
      supplierActions.getAllSuppliers,
      supplierActions.addSupplier,
      supplierActions.editSupplier,
      (state) => ({
        ...state,
        isLoadding: true,
      })
    ),
    on(supplierActions.getAllSuppliersSuccess, (state, action) => ({
      ...state,
      suppliers: [...action.supplierResponse],
    })),
    on(supplierActions.addSupplierSuccess, (state, action) => ({
      ...state,
      suppliers: [action.supplierResponse, ...state.suppliers],
    })),
    on(supplierActions.editSupplierSuccess, (state, action) => ({
      ...state,
      suppliers: updateExistingsItem(state.suppliers, action.supplierResponse),
    }))
  ),
});

const updateExistingsItem = (
  items: SupplierResponseInterface[],
  updateItem: SupplierResponseInterface
) => {
  const foundIndex = items.findIndex((item) => item.id === updateItem.id);
  const newArray = [...items];
  newArray[foundIndex] = updateItem;
  return newArray;
};

export const {
  name: supplierFeatureKey,
  reducer: supplierReducer,
  selectError,
  selectSuppliers,
  selectIsLoadding,
} = supplierFeature;
