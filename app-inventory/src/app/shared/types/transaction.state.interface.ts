import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';
export interface TransactionStateInterface {
  isLoading: boolean;
  transactionResponse: TransactionResponseInterface | undefined;
  error: unknown;
}
