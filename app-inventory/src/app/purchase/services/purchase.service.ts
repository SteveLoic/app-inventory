import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TransactionRequestInterface } from '../../shared/types/transaction.request.interface';
import { Observable } from 'rxjs';
import { TransactionResponseInterface } from '../../shared/types/transaction.response.interface';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  http = inject(HttpClient);

  private static BASE_URL = 'http://localhost:5051/api/v1';

  purchase(
    request: TransactionRequestInterface
  ): Observable<TransactionResponseInterface> {
    return this.http.post<TransactionResponseInterface>(
      `${PurchaseService.BASE_URL}/transactions/product/purchase`,
      request
    );
  }
}
