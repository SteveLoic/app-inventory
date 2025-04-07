import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TransactionPageResponseInterface } from '../types/transaction.page.response.interface';
import { TransactionRequestInterface } from '../../shared/types/transaction.request.interface';
import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';

export const transactionsActions = createActionGroup({
  source: 'transaction',
  events: {
    'get all transactions': props<{ searchTransaction: string }>(),
    'get all transactions success': props<{
      response: TransactionPageResponseInterface;
    }>(),
    'get all transactions error': props<{
      error: unknown;
    }>(),
    'update transaction': props<{
      transactionId: string;
      request: TransactionRequestInterface;
    }>(),
    'update transaction success': props<{
      response: TransactionResponseInterface;
    }>(),
    'update transaction error': props<{
      error: unknown;
    }>(),
    'delete transaction': props<{
      transactionId: string;
    }>(),
    'delete transaction success': emptyProps(),
    'delete transaction error': props<{ error: unknown }>(),
  },
});
