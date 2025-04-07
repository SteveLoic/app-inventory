import { createActionGroup, props } from '@ngrx/store';
import { TransactionRequestInterface } from '../../shared/types/transaction.request.interface';
import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';

export const purchaseActions = createActionGroup({
  source: 'purchase',
  events: {
    'purchase product': props<{ request: TransactionRequestInterface }>(),
    'purchase product success': props<{
      response: TransactionResponseInterface;
    }>(),
    'purchase product error': props<{
      error: unknown;
    }>(),
  },
});
