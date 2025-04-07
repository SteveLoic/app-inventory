import { AuthResponseInterface } from './auth.response.interface';

export interface AuthStateInterface {
  currentUser: AuthResponseInterface | null | undefined;
  isLoading: boolean;
  isSubmitting: boolean;
  validationsErrors: any | null | undefined;
  isAuthenticated: boolean;
  currentRole: string | null;
}
