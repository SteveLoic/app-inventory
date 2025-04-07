import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionService } from '../services/transaction.service';
import { transactionsActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getAllTransactionsEffects$ = createEffect(
  (
    actions$ = inject(Actions),
    transactionService = inject(TransactionService)
  ) => {
    return actions$.pipe(
      ofType(transactionsActions.getAllTransactions),
      switchMap(({ searchTransaction }) => {
        return transactionService.getAllTransactions(searchTransaction).pipe(
          map((response) =>
            transactionsActions.getAllTransactionsSuccess({
              response: response,
            })
          ),
          catchError((error) => {
            return of(
              transactionsActions.getAllTransactionsError({ error: error })
            );
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const updateTransactionEffects = createEffect(
  (
    actions$ = inject(Actions),
    transactionService = inject(TransactionService)
  ) => {
    return actions$.pipe(
      ofType(transactionsActions.updateTransaction),
      switchMap(({ transactionId, request }) => {
        return transactionService
          .updateTransaction(request, transactionId)
          .pipe(
            map((response) =>
              transactionsActions.updateTransactionSuccess({ response })
            ),
            catchError((error) => {
              return of(transactionsActions.updateTransactionError({ error }));
            })
          );
      })
    );
  },
  { functional: true }
);

export const deleteTransactionEffects$ = createEffect(
  (
    actions$ = inject(Actions),
    transactionService = inject(TransactionService)
  ) => {
    return actions$.pipe(
      ofType(transactionsActions.deleteTransaction),
      switchMap(({ transactionId }) => {
        return transactionService.deleteTransaction(transactionId).pipe(
          map(() => transactionsActions.deleteTransactionSuccess()),
          catchError((error) => {
            return of(transactionsActions.deleteTransactionError({ error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
