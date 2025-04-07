import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authInterceptor } from './shared/services/auth.interceptor';
import { provideEffects } from '@ngrx/effects';

import * as authEffects from './auth/store/effects';
import * as categoriesEffects from './category/store/effects';
import * as productEffects from './product/store/effects';
import * as supplierEffects from './supplier/store/effects';
import * as transactionsEffects from './transactions/store/effects';
import { authFeatureKey, authReducer } from './auth/store/reducer';
import { categoryFeatureKey, categoryReducer } from './category/store/reducer';
import { productFeatureKey, productReducer } from './product/store/reducer';
import { supplierFeatureKey, supplierReducer } from './supplier/store/reducer';
import {
  transactionFeatureKey,
  transactionReducer,
} from './transactions/store/reducer';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideEffects(authEffects),
    provideEffects(categoriesEffects),
    provideEffects(productEffects),
    provideEffects(supplierEffects),
    provideEffects(transactionsEffects),
    provideState(supplierFeatureKey, supplierReducer),
    provideState(categoryFeatureKey, categoryReducer),
    provideState(productFeatureKey, productReducer),
    provideState(authFeatureKey, authReducer),
    provideState(transactionFeatureKey, transactionReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr(),
  ],
};
