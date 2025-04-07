import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SupplierResponseInterface } from '../types/supplier.response.interface';
import { SupplierRequestInterface } from '../types/supplier.request.interface';

export const supplierActions = createActionGroup({
  source: 'Supplier',
  events: {
    'get all suppliers': emptyProps(),
    'get all suppliers success': props<{
      supplierResponse: SupplierResponseInterface[];
    }>(),
    'add supplier': props<{ supplierRequest: SupplierRequestInterface }>(),
    'add  supplier success': props<{
      supplierResponse: SupplierResponseInterface;
    }>(),
    'delete supplier': props<{ supplierId: string }>(),
    'edit supplier': props<{
      supplierRequest: SupplierRequestInterface;
    }>(),

    'edit supplier success': props<{
      supplierResponse: SupplierResponseInterface;
    }>(),
    'supplier error': props<{ errors: any }>(),
  },
});
