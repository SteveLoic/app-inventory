import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';

export interface TransactionPageResponseInterface {
  contents?: Array<TransactionResponseInterface>;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
