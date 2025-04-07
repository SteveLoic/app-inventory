import { Inject, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PersistanceService } from '../../shared/services/persistance.service';

export const loginEffects$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((response) => {
            persistanceService.set('token', response.token);
            return authActions.loginSucces({ response });
          }),
          catchError((error) => {
            return of(authActions.loginFailure({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const registerEffects$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((response) => {
            persistanceService.set('token', response.token);
            return authActions.registerSucces({ response });
          }),
          catchError((error) => {
            return of(authActions.registerFailure({ errors: error }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const logoutEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        persistanceService.clearAuth();
        router.navigateByUrl('/login');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const redirectAfterloginAndRegisterEffect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSucces, authActions.registerSucces),
      tap(() => {
        router.navigateByUrl('/dashboard');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
