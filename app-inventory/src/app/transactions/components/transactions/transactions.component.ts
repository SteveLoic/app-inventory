import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectTransactions } from '../../store/reducer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { transactionsActions } from '../../store/actions';

@Component({
  selector: 'inv-app-transactions',
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  store = inject(Store);
  router = inject(Router);

  data$ = combineLatest({
    transactions: this.store.select(selectTransactions),
    error: this.store.select(selectError),
  });

  navigateTOTransactionsDetailsPage(transactionId: string) {
    this.router.navigate([`transactions/transaction-detail/:${transactionId}`]);
  }
}
