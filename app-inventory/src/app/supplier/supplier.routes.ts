import { Route } from '@angular/router';
import { AddEditSuppliertComponent } from './components/add-edit-suppliert/add-edit-suppliert.component';
import { SupplierComponent } from './components/supplier/supplier.component';

export const supplierRoutes: Route[] = [
  {
    path: '',
    component: SupplierComponent,
  },
];

export const addSupplierRoutes: Route[] = [
  {
    path: '',
    component: AddEditSuppliertComponent,
  },
];

export const EditSupplierRoutes: Route[] = [
  {
    path: '',
    component: AddEditSuppliertComponent,
  },
];
