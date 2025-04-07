import { SupplierResponseInterface } from './supplier.response.interface';

export interface SupplierStateInterface {
  suppliers: SupplierResponseInterface[];
  isLoadding: boolean;
  error: any;
}
