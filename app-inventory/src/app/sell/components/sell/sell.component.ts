import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectProducts } from '../../../product/store/reducer';
import { sellActions } from '../../store/actions';
import { TransactionRequestInterface } from '../../../shared/types/transaction.request.interface';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'inv-app-sell',
  imports: [ReactiveFormsModule, CommonModule, ToastrModule],
  standalone: true,
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.scss',
})
export class SellComponent {
  store = inject(Store);
  fb = inject(FormBuilder);

  data$ = combineLatest({
    products: this.store.select(selectProducts),
    error: this.store.select(selectError),
  });

  form = this.fb.nonNullable.group({
    productId: ['', Validators.required],
    description: [''],
    quantity: [],
  });

  onHandleSumit(): void {
    const request: TransactionRequestInterface = {
      ...this.form.getRawValue(),
    };

    this.store.dispatch(sellActions.sell({ request: request }));
    this.form.reset();
  }
}
