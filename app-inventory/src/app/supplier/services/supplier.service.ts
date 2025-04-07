import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierResponseInterface } from '../types/supplier.response.interface';
import { SupplierRequestInterface } from '../types/supplier.request.interface';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  http = inject(HttpClient);
  private static BASE_URL = 'http://localhost:5051/api/v1';

  getAllSuppliers(): Observable<SupplierResponseInterface[]> {
    return this.http.get<SupplierResponseInterface[]>(
      `${SupplierService.BASE_URL}/suppliers/all`
    );
  }

  addSupplier(
    supplierRequest: SupplierRequestInterface
  ): Observable<SupplierResponseInterface> {
    return this.http.post<SupplierResponseInterface>(
      `${SupplierService.BASE_URL}/suppliers/supplier/add`,
      supplierRequest
    );
  }

  editSupplier(
    supplierRequest: SupplierRequestInterface
  ): Observable<SupplierResponseInterface> {
    return this.http.put<SupplierResponseInterface>(
      `${SupplierService.BASE_URL}/suppliers/supplier/${supplierRequest.id}/supplier`,
      supplierRequest
    );
  }

  deleteSupplier(supplierId: string): Observable<any> {
    return this.http.delete<any>(
      `${SupplierService.BASE_URL}/suppliers/supplier/${supplierId}/supplier`
    );
  }
}
