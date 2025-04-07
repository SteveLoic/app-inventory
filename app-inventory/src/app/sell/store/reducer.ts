import { createFeature, createReducer, on } from '@ngrx/store';
import { TransactionStateInterface } from '../../shared/types/transaction.state.interface';
import { sellActions } from './actions';

const initialState: TransactionStateInterface = {
  isLoading: false,
  transactionResponse: undefined,
  error: undefined,
};

const sellFeature = createFeature({
  name: 'sell',
  reducer: createReducer(
    initialState,
    on(sellActions.sell, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(sellActions.sellSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      transactionResponse: action.response,
    })),
    on(sellActions.sellError, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }))
  ),
});

export const {
  name: sellFeatureKey,
  reducer: sellReducer,
  selectIsLoading,
  selectError,
  selectTransactionResponse,
} = sellFeature;
