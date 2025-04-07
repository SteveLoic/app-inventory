import { Route } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { AddImageProductComponent } from './components/add-image-product/add-image-product.component';

export const productRoutes: Route[] = [
  {
    path: '',
    component: ProductsComponent,
  },
];

export const addProduct: Route[] = [
  {
    path: '',
    component: AddEditProductComponent,
  },
];

export const editProduct: Route[] = [
  {
    path: '',
    component: AddEditProductComponent,
  },
];

export const addImageProduct: Route[] = [
  {
    path: '',
    component: AddImageProductComponent,
  },
];
