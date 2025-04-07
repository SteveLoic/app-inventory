import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { categoryResponseInterface } from '../types/category.response.interface';
import { CategoryRequestInterface } from '../types/category.request.interface';

export const categoryActions = createActionGroup({
  source: 'category',
  events: {
    'get all categories': emptyProps(),
    'get all categories success': props<{
      categoriesResponse: categoryResponseInterface[];
    }>(),
    'add category': props<{ categoryRequest: CategoryRequestInterface }>(),
    'add category success': props<{
      categoryResponse: categoryResponseInterface;
    }>(),
    'delete category': props<{ categoryId: string }>(),
    'get category by id': props<{ categoryId: string }>(),
    'edit category': props<{
      categoryRequest: CategoryRequestInterface;
    }>(),

    'edit category success': props<{
      categoryResponse: categoryResponseInterface;
    }>(),
    'category error': props<{ errors: any }>(),
  },
});
