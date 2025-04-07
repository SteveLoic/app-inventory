import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionPageResponseInterface } from '../types/transaction.page.response.interface';
import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';
import { TransactionRequestInterface } from '../../shared/types/transaction.request.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  http = inject(HttpClient);
  private static BASE_URL = 'http://localhost:5051/api/v1';

  getAllTransactions(
    searchTransactions: string
  ): Observable<TransactionPageResponseInterface> {
    return this.http.get<TransactionPageResponseInterface>(
      `${TransactionService.BASE_URL}/transactions/all`,
      { params: { search: searchTransactions } }
    );
  }

  updateTransaction(
    request: TransactionRequestInterface,
    transactionId: string
  ): Observable<TransactionResponseInterface> {
    return this.http.put<TransactionResponseInterface>(
      `${TransactionService.BASE_URL}/transactions/transaction/${transactionId}/transaction`,
      request
    );
  }

  deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete<any>(
      `${TransactionService.BASE_URL}/transactions/transaction/${transactionId}/transaction}`
    );
  }
}
