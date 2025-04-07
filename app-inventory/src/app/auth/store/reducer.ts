import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/auth.state.interface';
import { authActions } from './actions';

const initialState: AuthStateInterface = {
  currentUser: undefined,
  isLoading: false,
  isSubmitting: false,
  validationsErrors: undefined,
  isAuthenticated: false,
  currentRole: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.login, (state) => ({ ...state, isSubmitting: true })),
    on(authActions.loginSucces, (state, action) => ({
      ...state,
      isSubmitting: false,
      isAuthenticated: true,
      currentUser: action.response,
      currentRole: action.response.role,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationsErrors: action.errors,
    })),
    on(authActions.logout, (state) => initialState),
    on(authActions.register, (state) => ({ ...state, isSubmitting: true })),
    on(authActions.registerSucces, (state, action) => ({
      ...state,
      isSubmitting: false,
      isAuthenticated: true,
      currentUser: action.response,
      currentRole: action.response.role,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationsErrors: action.errors,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsLoading,
  selectCurrentUser,
  selectIsSubmitting,
  selectValidationsErrors,
  selectCurrentRole,
  selectIsAuthenticated,
} = authFeature;
