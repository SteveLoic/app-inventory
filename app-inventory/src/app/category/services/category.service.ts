import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryResponseInterface } from '../types/category.response.interface';
import { CategoryRequestInterface } from '../types/category.request.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  private static BASE_URL = 'http://localhost:5051/api/v1';

  getAllCategories(): Observable<categoryResponseInterface[]> {
    return this.http.get<categoryResponseInterface[]>(
      `${CategoryService.BASE_URL}/categories/all`
    );
  }

  addCategory(
    categoryRequest: CategoryRequestInterface
  ): Observable<categoryResponseInterface> {
    return this.http.post<categoryResponseInterface>(
      `${CategoryService.BASE_URL}/categories/category/add`,
      categoryRequest
    );
  }

  editCategory(
    categoryRequest: CategoryRequestInterface
  ): Observable<categoryResponseInterface> {
    return this.http.put<categoryResponseInterface>(
      `${CategoryService.BASE_URL}/categories/category/${categoryRequest.id}/category`,
      categoryRequest
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(
      `${CategoryService.BASE_URL}/categories/category/${categoryId}/category`
    );
  }
}
