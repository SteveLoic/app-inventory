import { createFeature, createReducer, on } from '@ngrx/store';
import { TransactionsResponsesStateInterface } from '../types/transactions.responses.state.interface';
import { transactionsActions } from './actions';
import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';

const initialState: TransactionsResponsesStateInterface = {
  transactions: [],
  isLoading: false,
  error: undefined,
};

const transactionsFeature = createFeature({
  name: 'transaction',
  reducer: createReducer(
    initialState,
    on(transactionsActions.getAllTransactions, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(transactionsActions.getAllTransactionsSuccess, (state, action) => ({
      ...state,
      transactions: [...(action.response.contents || [])],
    })),
    on(transactionsActions.updateTransactionSuccess, (state, action) => ({
      ...state,
      transactions: updateTransactionItem(action.response, state.transactions),
    })),
    on(transactionsActions.getAllTransactionsError, (state, action) => ({
      ...state,
      error: action.error,
    }))
  ),
});

const updateTransactionItem = (
  transaction: TransactionResponseInterface,
  transactions: TransactionResponseInterface[]
) => {
  const foundIndex = transactions.findIndex(
    (item) => item.id === transaction.id
  );
  const newArray = [...transactions];
  newArray[foundIndex] = transaction;
  return newArray;
};

export const {
  name: transactionFeatureKey,
  reducer: transactionReducer,
  selectTransactions,
  selectIsLoading,
  selectError,
} = transactionsFeature;
