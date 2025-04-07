import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '../services/category.service';
import { categoryActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

export const getAllCategoriesEffect$ = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.getAllCategories),
      switchMap(() => {
        return categoryService.getAllCategories().pipe(
          map((categoriesResponse) =>
            categoryActions.getAllCategoriesSuccess({
              categoriesResponse: categoriesResponse,
            })
          ),
          catchError((error) => {
            return of(categoryActions.categoryError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const addCategoryEffect$ = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.addCategory),
      switchMap(({ categoryRequest }) => {
        return categoryService.addCategory(categoryRequest).pipe(
          map((categoriesResponse) =>
            categoryActions.addCategorySuccess({
              categoryResponse: categoriesResponse,
            })
          ),
          catchError((error) => {
            return of(categoryActions.categoryError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const EditCategoryEffect$ = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.editCategory),
      switchMap(({ categoryRequest }) => {
        return categoryService.editCategory(categoryRequest).pipe(
          map((categoriesResponse) =>
            categoryActions.editCategorySuccess({
              categoryResponse: categoriesResponse,
            })
          ),
          catchError((error) => {
            return of(categoryActions.categoryError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const deleteCategoryEffect$ = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.deleteCategory),
      switchMap(({ categoryId }) => {
        return categoryService.deleteCategory(categoryId).pipe(
          map(() => categoryActions.getAllCategories()),
          catchError((error) => {
            return of(categoryActions.categoryError({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
