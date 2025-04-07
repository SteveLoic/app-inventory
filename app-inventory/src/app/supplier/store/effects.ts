import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { supplierActions } from './actions';
import { SupplierService } from '../services/supplier.service';

export const getAllSupplierEffect$ = createEffect(
  (actions$ = inject(Actions), supplierService = inject(SupplierService)) => {
    return actions$.pipe(
      ofType(supplierActions.getAllSuppliers),
      switchMap(() => {
        return supplierService.getAllSuppliers().pipe(
          map((supplierResponse) =>
            supplierActions.getAllSuppliersSuccess({
              supplierResponse: supplierResponse,
            })
          ),
          catchError((error) => {
            return of(supplierActions.supplierError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const addSupplierEffect$ = createEffect(
  (actions$ = inject(Actions), supplierService = inject(SupplierService)) => {
    return actions$.pipe(
      ofType(supplierActions.addSupplier),
      switchMap(({ supplierRequest }) => {
        return supplierService.addSupplier(supplierRequest).pipe(
          map((supplierResponse) =>
            supplierActions.addSupplierSuccess({ supplierResponse })
          ),
          catchError((error) => {
            return of(supplierActions.supplierError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const EditSupplierEffect$ = createEffect(
  (actions$ = inject(Actions), supplierService = inject(SupplierService)) => {
    return actions$.pipe(
      ofType(supplierActions.editSupplier),
      switchMap(({ supplierRequest }) => {
        return supplierService.editSupplier(supplierRequest).pipe(
          map((supplierResponse) =>
            supplierActions.editSupplierSuccess({
              supplierResponse: supplierResponse,
            })
          ),
          catchError((error) => {
            return of(supplierActions.supplierError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const deleteSupplierEffect$ = createEffect(
  (actions$ = inject(Actions), supplierService = inject(SupplierService)) => {
    return actions$.pipe(
      ofType(supplierActions.deleteSupplier),
      switchMap(({ supplierId }) => {
        return supplierService.deleteSupplier(supplierId).pipe(
          map(() => supplierActions.getAllSuppliers),
          catchError((error) => {
            return of(supplierActions.supplierError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
