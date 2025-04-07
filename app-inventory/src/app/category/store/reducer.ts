import { createFeature, createReducer, on } from '@ngrx/store';
import { categoryStateInterface } from '../types/category.state.interface';
import { categoryActions } from './actions';
import { categoryResponseInterface } from '../types/category.response.interface';

const initialState: categoryStateInterface = {
  categories: [],
  isLoading: false,
  error: undefined,
};

const categoryKey = createFeature({
  name: 'category',
  reducer: createReducer(
    initialState,
    on(
      categoryActions.getAllCategories,
      categoryActions.addCategory,
      categoryActions.editCategory,
      (state) => ({
        ...state,
        isLoading: true,
      })
    ),
    on(categoryActions.getAllCategoriesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      categories: [...action.categoriesResponse],
    })),
    on(categoryActions.addCategorySuccess, (state, action) => ({
      ...state,
      categories: [action.categoryResponse, ...state.categories],
    })),
    on(categoryActions.editCategorySuccess, (state, action) => ({
      ...state,
      categories: updateExistingsCategory(
        state.categories,
        action.categoryResponse
      ),
    })),
    on(categoryActions.categoryError, (state, action) => ({
      ...state,
      isLoading: true,
      error: action.errors,
    }))
  ),
});

const updateExistingsCategory = (
  categories: categoryResponseInterface[],
  updateCategory: categoryResponseInterface
) => {
  const foundCategoryIndex = categories.findIndex(
    (category) => category.id === updateCategory.id
  );
  const newArray = [...categories];
  newArray[foundCategoryIndex] = updateCategory;
  return newArray;
};

export const {
  name: categoryFeatureKey,
  reducer: categoryReducer,
  selectCategories,
  selectError,
  selectIsLoading,
} = categoryKey;
