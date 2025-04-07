import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSupplierById } from '../../store/selectors';
import { selectError } from '../../store/reducer';
import { supplierActions } from '../../store/actions';
import { SupplierRequestInterface } from '../../types/supplier.request.interface';

@Component({
  selector: 'inv-app-add-edit-suppliert',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './add-edit-suppliert.component.html',
  styleUrl: './add-edit-suppliert.component.scss',
})
export class AddEditSuppliertComponent implements OnInit {
  store = inject(Store);
  fb = inject(FormBuilder);
  router = inject(Router);
  supplier$ = new Observable();
  isEditing: boolean = false;
  supplierId: string = '';

  error$ = this.store.select(selectError);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    address: [''],
  });

  ngOnInit(): void {
    this.supplierId = this.router.url.split('/')[3];
    if (this.supplierId) {
      this.isEditing = true;
      this.store.select(getSupplierById(this.supplierId)).subscribe((data) => {
        if (data) {
          this.form.patchValue(data);
        }
      });
    }
  }

  onHandleSubmit(): void {
    if (this.form.valid) {
      if (!this.isEditing) {
        const supplierRequest: SupplierRequestInterface = {
          name: this.form.getRawValue().name,
          address: this.form.getRawValue().address,
        };
        this.store.dispatch(
          supplierActions.addSupplier({ supplierRequest: supplierRequest })
        );
      } else {
        const supplierRequest: SupplierRequestInterface = {
          id: this.supplierId,
          name: this.form.getRawValue().name,
          address: this.form.getRawValue().address,
        };
        this.store.dispatch(supplierActions.editSupplier({ supplierRequest }));
        this.isEditing = false;
      }

      this.form.reset();
      this.router.navigate(['/supplier']);
    }
  }
}
