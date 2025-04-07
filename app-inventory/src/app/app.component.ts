import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentRole, selectIsAuthenticated } from './auth/store/reducer';
import { authActions } from './auth/store/actions';
import { productActions } from './product/store/actions';
import { supplierActions } from './supplier/store/actions';
import { transactionsActions } from './transactions/store/actions';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'app-inventory';
  authService = inject(AuthService);
  store = inject(Store);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  data$ = combineLatest({
    isAuthenticated: this.store.select(selectIsAuthenticated),
    role: this.store.select(selectCurrentRole),
  });

  ngOnInit(): void {
    this.store.select(selectIsAuthenticated).subscribe((response) => {
      if (response) {
        this.store.dispatch(productActions.getAllProduct());
        this.store.dispatch(supplierActions.getAllSuppliers());
        this.store.dispatch(
          transactionsActions.getAllTransactions({
            searchTransaction: '',
          })
        );
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(authActions.logout());
    this.cdr.detectChanges();
  }
}
