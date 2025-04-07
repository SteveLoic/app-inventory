import { Route } from '@angular/router';
import { SellComponent } from './components/sell/sell.component';

import * as sellEffects from './store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { sellFeatureKey, sellReducer } from './store/reducer';

export const sellRoutes: Route[] = [
  {
    path: '',
    component: SellComponent,
    providers: [
      provideEffects(sellEffects),
      provideState(sellFeatureKey, sellReducer),
    ],
  },
];
