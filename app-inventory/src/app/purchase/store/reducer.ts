import { createFeature, createReducer, on } from '@ngrx/store';
import { purchaseActions } from './actions';
import { TransactionStateInterface } from '../../shared/types/transaction.state.interface';

const initialState: TransactionStateInterface = {
  isLoading: false,
  transactionResponse: undefined,
  error: undefined,
};

const purchaseFeature = createFeature({
  name: 'purchase',
  reducer: createReducer(
    initialState,
    on(purchaseActions.purchaseProduct, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(purchaseActions.purchaseProductSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      transactionResponse: action.response,
    })),
    on(purchaseActions.purchaseProductError, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }))
  ),
});

export const {
  name: purchaseFeatureKey,
  reducer: purchaseReducer,
  selectError,
  selectIsLoading,
  selectTransactionResponse,
} = purchaseFeature;
