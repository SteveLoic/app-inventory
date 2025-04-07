import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectError } from '../../store/reducer';
import { selectCategories } from '../../../category/store/reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequestInterface } from '../../types/product.request.interface';
import { productActions } from '../../store/actions';
import { categoryActions } from '../../../category/store/actions';
import { getProductById } from '../../store/selectors';

@Component({
  selector: 'inv-app-add-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent implements OnInit {
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  error$ = this.store.select(selectError);
  categories$ = this.store.select(selectCategories);

  isEditing: boolean = false;
  imageFile: File | null = null;
  imageUrl: string = '';
  productId: string | null | undefined = '';

  form = this.fb.nonNullable.group({
    productId: '',
    name: ['', Validators.required],
    sku: ['', Validators.required],
    price: [0, Validators.required],
    stockQuantity: [0, Validators.required],
    categoryId: [0, Validators.required],
    description: [''],
  });

  ngOnInit(): void {
    this.store.dispatch(categoryActions.getAllCategories());
    this.productId = this.route.snapshot.paramMap
      .get('productId')
      ?.substring(1);
    if (this.productId) {
      this.isEditing = true;
      this.store.select(getProductById(this.productId)).subscribe((product) => {
        if (product) {
          const productRequest: ProductRequestInterface = {
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: product.price,
            stockQuantity: product.stockQuantity,
            description: product.description,
            categoryId: Number(product.categoryId),
          };
          this.form.patchValue(productRequest);
        }
      });
    }
  }

  onHandleSubmit(event: any): void {
    if (this.form.valid) {
      const productRequest: ProductRequestInterface = {
        ...this.form.getRawValue(),
        id: this.productId ? this.productId : '',
      };
      if (!this.isEditing) {
        this.store.dispatch(
          productActions.addProduct({
            product: productRequest,
          })
        );
      } else {
        this.store.dispatch(
          productActions.editProduct({
            product: productRequest,
          })
        );
      }
      this.form.reset();
      this.router.navigate(['/products']);
    }
  }
}
