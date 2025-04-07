import { Routes } from '@angular/router';
import { GuardService } from './shared/services/guard.service';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoute),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoute),
  },
  {
    path: 'dashboard',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.dashboard),
  },
  {
    path: 'category',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./category/category.routes').then((m) => m.categoryRoutes),
  },

  {
    path: 'supplier',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./supplier/supplier.routes').then((m) => m.supplierRoutes),
  },

  {
    path: 'supplier/add-supplier',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./supplier/supplier.routes').then((m) => m.addSupplierRoutes),
  },
  {
    path: 'supplier/edit-supplier/:supplierId',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./supplier/supplier.routes').then((m) => m.EditSupplierRoutes),
  },

  {
    path: 'products',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./product/product.routes').then((m) => m.productRoutes),
  },
  {
    path: 'products/add-product',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./product/product.routes').then((m) => m.addProduct),
  },
  {
    path: 'products/edit-product/:productId',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./product/product.routes').then((m) => m.editProduct),
  },

  {
    path: 'products/add-image-product/:productId',
    canActivate: [GuardService],
    data: { requiresAdmin: true },
    loadChildren: () =>
      import('./product/product.routes').then((m) => m.addImageProduct),
  },
  {
    path: 'purchase',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./purchase/purchase.routes').then((m) => m.purchaseRoutes),
  },
  {
    path: 'sell',
    canActivate: [GuardService],
    loadChildren: () => import('./sell/sell.routes').then((m) => m.sellRoutes),
  },
  {
    path: 'transactions',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./transactions/transactions.routes').then(
        (m) => m.transactionsRoutes
      ),
  },
  {
    path: 'transactions/transaction-detail/:transactionId',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./transactions/transactions.routes').then(
        (m) => m.transactionsRoutesDetails
      ),
  },
  {
    path: 'profile',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./profile/profile.route').then((m) => m.profileRoutes),
  },

  // WIDE CARD
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
