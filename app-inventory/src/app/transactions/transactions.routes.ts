import { Route } from '@angular/router';
import { TransactionsDetailsComponent } from './components/transactions-details/transactions-details.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

export const transactionsRoutes: Route[] = [
  {
    path: '',
    component: TransactionsComponent,
  },
];

export const transactionsRoutesDetails: Route[] = [
  {
    path: '',
    component: TransactionsDetailsComponent,
  },
];
