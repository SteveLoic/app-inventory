import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectProducts } from '../../store/reducer';
import { productActions } from '../../store/actions';

@Component({
  selector: 'inv-app-products',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);

  data$ = combineLatest({
    products: this.store.select(selectProducts),
    error: this.store.select(selectError),
  });

  ngOnInit(): void {
    this.store.dispatch(productActions.getAllProduct());
  }

  navigateToAddProductPage(): void {
    this.router.navigate(['products/add-product']);
  }

  onNavigateToAddImageProductPage(productId: string): void {
    this.router.navigate([`products/add-image-product/:${productId}`]);
  }

  onNavigateToEditProductPage(productId: string) {
    this.router.navigate([`products/edit-product/:${productId}`]);
  }

  onHandleProductDelete(productId: string) {
    if (productId) {
      this.store.dispatch(
        productActions.deleteProduct({ productId: productId })
      );
    }
  }
}
