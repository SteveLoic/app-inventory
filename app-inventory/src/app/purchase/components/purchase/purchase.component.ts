import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectProducts } from '../../../product/store/reducer';
import { selectSuppliers } from '../../../supplier/store/reducer';
import { selectError } from '../../store/reducer';
import { TransactionRequestInterface } from '../../../shared/types/transaction.request.interface';
import { purchaseActions } from '../../store/actions';

@Component({
  selector: 'inv-app-purchase',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent {
  fb = inject(FormBuilder);
  store = inject(Store);

  data$ = combineLatest({
    products: this.store.select(selectProducts),
    suppliers: this.store.select(selectSuppliers),
    error: this.store.select(selectError),
  });

  form = this.fb.nonNullable.group({
    productId: ['', Validators.required],
    supplierId: ['', Validators.required],
    description: [''],
    quantity: [],
  });

  onHandleSumit(): void {
    const request: TransactionRequestInterface = {
      ...this.form.getRawValue(),
    };
    this.store.dispatch(purchaseActions.purchaseProduct({ request: request }));
    this.form.reset();
  }
}
