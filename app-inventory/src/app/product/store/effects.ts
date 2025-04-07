import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import { productActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getAllProductEffect$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getAllProduct),
      switchMap(() => {
        return productService.getAllProduct().pipe(
          map((productResponse) =>
            productActions.getAllProductSuccess({ products: productResponse })
          ),
          catchError((error) => {
            return of(productActions.productError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const addProductEffect$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.addProduct),
      switchMap(({ product }) => {
        return productService.addProduct(product).pipe(
          map((productResponse) =>
            productActions.addProductSuccess({ product: productResponse })
          ),
          catchError((error) => {
            return of(productActions.productError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const addImageToProductEffect$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.addImage),
      switchMap(({ productId, image }) => {
        return productService.addImage(image, productId).pipe(
          map(() => productActions.addImageSuccess()),
          catchError((error) => {
            return of(productActions.productError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const editProductEffect$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.editProduct),
      switchMap(({ product }) => {
        return productService.editProduct(product).pipe(
          map((productResponse) =>
            productActions.editProductSuccess({ product: productResponse })
          ),
          catchError((error) => {
            return of(productActions.productError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const deleteProductEffect$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.deleteProduct),
      switchMap(({ productId }) => {
        return productService.deleteProduct(productId).pipe(
          map(() => productActions.getAllProduct()),
          catchError((error) => {
            return of(productActions.productError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
