import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { SellService } from '../services/sell.service';
import { sellActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const sellEffects$ = createEffect(
  (actions$ = inject(Actions), sellService = inject(SellService)) => {
    return actions$.pipe(
      ofType(sellActions.sell),
      switchMap(({ request }) => {
        return sellService.sellProduct(request).pipe(
          map((response) => sellActions.sellSuccess({ response: response })),
          catchError((error) => {
            return of(sellActions.sellError({ error: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const sellSuccessEffects$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastrService)) => {
    return actions$.pipe(
      ofType(sellActions.sellSuccess),
      tap(() => {
        console.log('test success');
      }),
      tap(() => toastService.success('Product sold successfully!'))
    );
  },
  { functional: true, dispatch: false }
);
