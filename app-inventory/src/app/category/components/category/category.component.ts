import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Store } from '@ngrx/store';
import { categoryActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import {
  selectCategories,
  selectError,
  selectIsLoading,
} from '../../store/reducer';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryRequestInterface } from '../../types/category.request.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'inv-app-category',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categoryService = inject(CategoryService);
  store = inject(Store);
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  categoryName: string = '';
  message: string = '';
  categoryId: string | null = null;
  isEditing: boolean = false;

  data$ = combineLatest({
    categories: this.store.select(selectCategories),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  ngOnInit(): void {
    this.store.dispatch(categoryActions.getAllCategories());
  }

  onAddCategory(): void {
    if (this.form.valid) {
      const categoryRequest: CategoryRequestInterface = {
        name: this.form.getRawValue().name,
      };
      this.store.dispatch(categoryActions.addCategory({ categoryRequest }));
      this.form.reset();
    }
  }

  editCategory(): void {
    const categoryRequest: CategoryRequestInterface = {
      id: this.categoryId!,
      name: this.form.getRawValue().name,
    };
    this.store.dispatch(
      categoryActions.editCategory({ categoryRequest: categoryRequest })
    );
    this.categoryId = null;
    this.isEditing = false;
    this.form.reset();
  }

  OnEditCategory(category: CategoryRequestInterface): void {
    this.form.patchValue(category);
    this.categoryId = category.id!;
    this.isEditing = true;
  }

  OnDeleteCateroy(category: CategoryRequestInterface): void {
    this.store.dispatch(
      categoryActions.deleteCategory({ categoryId: category.id! })
    );
  }
}
