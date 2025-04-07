import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { productActions } from '../../store/actions';

@Component({
  selector: 'inv-app-add-image-product',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-image-product.component.html',
  styleUrl: './add-image-product.component.scss',
})
export class AddImageProductComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);

  imageUrl: string = '';
  imageFile: File | null | undefined;
  form = this.fb.nonNullable.group({});

  onHandleImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  onHandleSubmit(): void {
    const productId = this.route.snapshot.paramMap
      .get('productId')
      ?.substring(1);
    if (productId && this.imageFile && this.imageUrl) {
      this.store.dispatch(
        productActions.addImage({
          productId: productId,
          image: this.imageFile!,
        })
      );
    }
  }
}
