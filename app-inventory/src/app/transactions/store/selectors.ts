import { createSelector } from '@ngrx/store';
import { selectTransactions } from './reducer';
import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';

export const getTransactionById = (transactionId: string) =>
  createSelector(
    selectTransactions,
    (transactions: TransactionResponseInterface[]) => {
      return transactions.find(
        (transaction) => Number(transaction.id) === Number(transactionId)
      );
    }
  );
