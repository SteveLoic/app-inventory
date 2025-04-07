import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getTransactionById } from '../../store/selectors';
import { TransactionResponseInterface } from '../../../shared/types/transaction.response.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'inv-app-transactions-details',
  imports: [CommonModule],
  templateUrl: './transactions-details.component.html',
  styleUrl: './transactions-details.component.scss',
})
export class TransactionsDetailsComponent implements OnInit {
  activateRoute = inject(ActivatedRoute);
  store = inject(Store);
  transaction: TransactionResponseInterface | undefined;

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      const transactionId = params['transactionId'].substring(1);
      this.store
        .select(getTransactionById(transactionId))
        .subscribe((response) => {
          this.transaction = response;
        });
    });
  }

  handleUpdateStatus(): void {
    console.log();
  }
}
