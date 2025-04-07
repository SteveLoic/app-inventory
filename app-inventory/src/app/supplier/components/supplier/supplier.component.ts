import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { supplierActions } from '../../store/actions';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoadding,
  selectSuppliers,
} from '../../store/reducer';
import { Router, RouterModule } from '@angular/router';
import { SupplierResponseInterface } from '../../types/supplier.response.interface';

@Component({
  selector: 'inv-app-supplier',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
})
export class SupplierComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);

  data$ = combineLatest({
    suppliers: this.store.select(selectSuppliers),
    error: this.store.select(selectError),
    isLoading: this.store.select(selectIsLoadding),
  });

  ngOnInit(): void {
    this.store.dispatch(supplierActions.getAllSuppliers());
  }

  navigateToAddSupplierPage() {
    this.router.navigate(['supplier/add-supplier']);
  }

  navigateToEditSupplierPage(supplierId: string) {
    this.router.navigate([`supplier/edit-supplier/${supplierId}`]);
  }

  handleDeleteSupplier(supplier: SupplierResponseInterface) {
    this.store.dispatch(
      supplierActions.deleteSupplier({ supplierId: supplier.id })
    );
  }
}
