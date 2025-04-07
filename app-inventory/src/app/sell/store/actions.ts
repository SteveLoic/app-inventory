import { createActionGroup, props } from '@ngrx/store';
import { TransactionRequestInterface } from '../../shared/types/transaction.request.interface';
import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';

export const sellActions = createActionGroup({
  source: 'sell',
  events: {
    sell: props<{ request: TransactionRequestInterface }>(),
    'sell success': props<{ response: TransactionResponseInterface }>(),
    'sell error': props<{ error: unknown }>(),
  },
});
