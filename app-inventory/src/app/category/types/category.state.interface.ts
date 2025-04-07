import { categoryResponseInterface } from './category.response.interface';

export interface categoryStateInterface {
  categories: categoryResponseInterface[];
  isLoading: boolean;
  error: any;
}
