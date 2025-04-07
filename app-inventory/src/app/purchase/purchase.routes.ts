import { Route } from '@angular/router';
import { PurchaseComponent } from './components/purchase/purchase.component';

import * as purchaseEffects from './store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { purchaseFeatureKey, purchaseReducer } from './store/reducer';

export const purchaseRoutes: Route[] = [
  {
    path: '',
    component: PurchaseComponent,
    providers: [
      provideEffects(purchaseEffects),
      provideState(purchaseFeatureKey, purchaseReducer),
    ],
  },
];
