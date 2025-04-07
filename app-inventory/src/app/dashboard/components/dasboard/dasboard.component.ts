import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ngxChartsCongig } from '../../../shared/utils/utils';
import { selectTransactions } from '../../../transactions/store/reducer';
import { TransactionResponseInterface } from '../../../shared/types/transaction.response.interface';

@Component({
  selector: 'inv-app-dasboard',
  imports: [CommonModule, ReactiveFormsModule, NgxChartsModule],
  standalone: true,
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss',
})
export class DasboardComponent implements OnInit {
  store = inject(Store);
  fb = inject(FormBuilder);

  transactions: TransactionResponseInterface[] = [];
  transactionsAmount: any[] = [];
  transactionsType: any[] = [];

  ngxChartsCongig = ngxChartsCongig;
  view: [number, number] = [700, 400];

  form = this.fb.nonNullable.group({
    selectedMonth: [''],
    selectedYear: [''],
  });

  ngOnInit(): void {
    this.store.select(selectTransactions).subscribe((transactions) => {
      this.transactions = transactions;
      if (this.transactions.length) {
        this.processChartData();
      }
    });
  }

  processChartData(): void {
    const typeCounts: { [key: string]: number } = {};
    const amountByType: { [key: string]: number } = {};

    this.transactions.forEach((transaction: TransactionResponseInterface) => {
      const type = transaction.transactionType;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
      amountByType[type] = (amountByType[type] || 0) + transaction.totalPrice;
    });
    this.transactionsType = Object.keys(typeCounts).map((type) => ({
      name: type,
      value: typeCounts[type],
    }));
    this.transactionsAmount = Object.keys(amountByType).map((type) => ({
      name: type,
      value: amountByType[type],
    }));
  }
}
