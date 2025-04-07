import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';

export interface TransactionsResponsesStateInterface {
  transactions: TransactionResponseInterface[] | [];
  isLoading: boolean;
  error: unknown;
}
