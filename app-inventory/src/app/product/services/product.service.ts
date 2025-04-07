import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponseInterface } from '../types/product.response.interface';
import { ProductRequestInterface } from '../types/product.request.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  private static BASE_URL = 'http://localhost:5051/api/v1';

  getAllProduct(): Observable<ProductResponseInterface[]> {
    return this.http.get<ProductResponseInterface[]>(
      `${ProductService.BASE_URL}/products/all`
    );
  }

  addProduct(
    productRequest: ProductRequestInterface
  ): Observable<ProductResponseInterface> {
    return this.http.post<ProductResponseInterface>(
      `${ProductService.BASE_URL}/products/product/add`,
      productRequest
    );
  }

  editProduct(
    productRequest: ProductRequestInterface
  ): Observable<ProductResponseInterface> {
    return this.http.put<ProductResponseInterface>(
      `${ProductService.BASE_URL}/products/product/${productRequest.id}/product`,
      productRequest
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(
      `${ProductService.BASE_URL}/products/product/${productId}/product`
    );
  }

  addImage(image: File, productId: string): Observable<any> {
    const formData = new FormData();
    const params = new HttpParams();
    formData.append('productId', productId);
    params.append('productId', productId);
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });

    return this.http.post<any>(
      `${ProductService.BASE_URL}/images/product/upload`,
      image,
      { params: params }
    );
  }
}
