import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PurchaseService } from '../services/purchase.service';
import { purchaseActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const purchaseEffects$ = createEffect(
  (actions$ = inject(Actions), purchaseService = inject(PurchaseService)) => {
    return actions$.pipe(
      ofType(purchaseActions.purchaseProduct),
      switchMap(({ request }) => {
        return purchaseService.purchase(request).pipe(
          map((response) =>
            purchaseActions.purchaseProductSuccess({ response: response })
          ),
          catchError((error) => {
            return of(purchaseActions.purchaseProductError({ error: error }));
          })
        );
      })
    );
  },
  { functional: true }
);
