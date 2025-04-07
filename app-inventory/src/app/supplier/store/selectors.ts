import { createSelector } from '@ngrx/store';
import { selectSuppliers } from './reducer';
import { SupplierResponseInterface } from '../types/supplier.response.interface';

export const getSupplierById = (supplierId: string) =>
  createSelector(selectSuppliers, (suppliers) => {
    return suppliers.find(
      (supplier: SupplierResponseInterface) =>
        Number(supplier.id) === Number(supplierId)
    );
  });
